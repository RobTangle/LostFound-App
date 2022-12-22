import SearchForm from "../SearchForm/SearchForm";
import { useSelector } from "react-redux";
import { PostFoundCard } from "../PostCard/PostFoundCard";

export function SearchComp() {
  const results = useSelector((state) => state.post.searchResults?.results);
  return (
    <>
      <SearchForm />
      <hr />
      <div>
        {Array.isArray(results) && results?.length === 0 ? (
          <h3>No se encontraron coincidencias</h3>
        ) : null}
        {Array.isArray(results) && results?.length > 0 ? (
          <div>
            <h3>Coincidencias encontradas: {results?.length}</h3>
            <div className="flex flex-wrap ">
              {results.map((post) => (
                <PostFoundCard post={post} key={post._id} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
