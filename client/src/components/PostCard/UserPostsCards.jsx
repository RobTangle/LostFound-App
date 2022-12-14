import { PostCardRow } from "./PostCardRow";

export function UserPostsCards({ posts }) {
  console.log("Soy el arg {posts} = ", posts);
  return (
    <div
      key={Math.random()}
      className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200"
    >
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Name on doc
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Number on doc
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Country found
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Date found
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 overflow-x-auto max-w-xs">
              Comments
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 overflow-x-auto max-w-xs">
              Additional contact information
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Doc Image
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {Array.isArray(posts)
            ? posts?.map((post) => (
                <PostCardRow post={post} key={Math.random()} />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
