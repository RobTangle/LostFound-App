import IDicon80 from "../../assets/IDicon80.png";
import { parseDateWithNoHours } from "../../helpers/dateParsers";

export function PostFoundCard({ post }) {
  return (
    <a
      href="#"
      className="relative block overflow-hidden rounded-lg border border-gray-100 p-8 my-5 mx-10"
    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="justify-between sm:flex">
        <div>
          <h3 className="uppercase text-xl font-bold text-gray-900">
            {post?.name_on_doc}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">
            {post?.number_on_doc}
          </p>
        </div>

        <div className="ml-3 hidden flex-shrink-0 sm:block">
          <img
            alt="Doc image"
            src={post?.blurred_imgs?.[0] || IDicon80}
            className="h-16 w-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>
      {/* 
      <div className="mt-4 sm:pr-8">
        <p className="text-sm text-gray-500">{post?.comments}</p>
      </div> */}

      <dl className="mt-6 flex">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Date found</dt>
          <dd className="text-xs text-gray-500">
            {parseDateWithNoHours(post?.date_found)}
          </dd>
        </div>

        <div className="ml-3 flex flex-col-reverse sm:ml-6">
          <dt className="text-sm font-medium text-gray-600">Country Found</dt>
          <dd className="uppercase text-xs text-gray-500">
            {post?.country_found}
          </dd>
        </div>
      </dl>
    </a>
  );
}
