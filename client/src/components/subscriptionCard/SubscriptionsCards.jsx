import { SubCardRow } from "./SubCardRow";

export function SubscriptionsCards({ subscriptions }) {
  console.log("Soy el arg {subscriptions} = ", subscriptions);
  return (
    <>
      <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Number on doc
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Country lost
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Date lost
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {Array.isArray(subscriptions)
              ? subscriptions?.map((sub) => (
                  <SubCardRow subscription={sub} key={Math.random()} />
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
