import { useCallback, useEffect, useRef, useState } from "react";
import RecipeList from "../components/RecipeList";
import HorizontalLine from "../components/elements/HorizontalLine";
import { supabase } from "../utils/supabase";
import Link from "next/link";
import FilterButton from "../components/FilterButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Home({ recipes }) {
  const [searchFilter, setSearchFilter] = useState("");
  const [dimensionFilter, setDimensionFilter] = useState({});
  const [dimensions, setDimensions] = useState({});
  const recipeListRef = useRef();

  const handleDimensionFilter = useCallback(
    (recipes) => {
      if (dimensionFilter === {}) return recipes;
      const filteredRecipes = recipes.filter((recipe) => {
        const filteredRecipe = Object.keys(dimensionFilter).map((dim) => {
          return dimensionFilter[dim].includes(recipe[dim]);
        });
        return filteredRecipe.every((recipe) => recipe);
      });
      return filteredRecipes;
    },
    [dimensionFilter]
  );

  const handleSearchFilter = useCallback(
    (recipes) => {
      if (searchFilter === "") return recipes;
      return recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchFilter.toLowerCase())
      );
    },
    [searchFilter]
  );

  useEffect(() => {
    const dimensions = (recipes) => {
      const uniques = {
        duration: { title: "Tid", unit: "min", values: [] },
        tags: { title: "Type", unit: "", values: [] },
      };

      const relevantDims = Object.keys(uniques);

      recipes.map((recipe) => {
        relevantDims.map((dimension) => {
          if (!uniques[dimension].values.includes(recipe[dimension])) {
            uniques[dimension].values.push(recipe[dimension]);
          }
        });
      });

      return uniques;
    };

    setDimensions(dimensions(recipes));
  }, [recipes]);

  return (
    <>
      <div className="flex flex-col gap-6 items-start mx-4 my-12 xs:mb-20">
        <h1 className="text-4xl">
          Kjappe lunsjoppskrifter <br />
          av og for folk med matlyst
        </h1>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              recipeListRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Se oppskriftene
          </button>
          <Link href="/recipe/new">
            <a className="button button-secondary">Legg til din oppskrift</a>
          </Link>
        </div>
      </div>
      <HorizontalLine className="mb-4" />
      <div className="flex items-center justify-between mx-4 mb-4 flex-wrap gap-y-2 gap-x-4">
        <div className="flex gap-2 items-center flex-wrap">
          {Object.keys(dimensions).map((dim, i) => (
            <FilterButton
              key={i}
              name={dimensions[dim].title}
              options={dimensions[dim].values}
              unit={dimensions[dim].unit}
              checkedValues={dimensionFilter[dim]}
              setOption={(option) => {
                const newDim = [...(dimensionFilter[dim] || [])];
                newDim.push(option);
                setDimensionFilter({
                  ...dimensionFilter,
                  [dim]: newDim,
                });
              }}
              removeOption={(option) => {
                const newDim = {
                  ...dimensionFilter,
                  [dim]: dimensionFilter[dim].filter(
                    (value) => value !== option
                  ),
                };
                if (newDim[dim].length < 1) {
                  delete newDim[dim];
                }
                setDimensionFilter(newDim);
              }}
            />
          ))}
          {(Object.keys(dimensionFilter).length > 0 || searchFilter !== "") && (
            <button
              className="button-sm ml-4"
              onClick={() => {
                setDimensionFilter({});
                setSearchFilter("");
              }}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Nullstill filter
            </button>
          )}
        </div>
        <input
          type="text"
          name="searchFilter"
          id="searchFilter"
          placeholder="Søk etter oppskrift"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>
      <HorizontalLine className="mb-4" />
      <RecipeList
        recipes={handleSearchFilter(handleDimensionFilter(recipes))}
        scrollRef={recipeListRef}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const { data: recipes } = await supabase.from("recipes_approved").select("*");

  return { props: { recipes: recipes || [] } };
};
