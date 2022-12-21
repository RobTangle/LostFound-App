import { useSelector } from "react-redux";
import { SubscriptionsCards } from "./SubscriptionsCards";

export function Subscriptions() {
  const userSubscriptions = useSelector(
    (state) => state.user?.userProfile?.subscriptions
  );

  return (
    <>
      {Array.isArray(userSubscriptions) && userSubscriptions.length === 0 ? (
        <div>
          <h3>No tiene subscripciones</h3>
        </div>
      ) : null}
      {Array.isArray(userSubscriptions) && userSubscriptions.length > 0 ? (
        <SubscriptionsCards subscriptions={userSubscriptions} />
      ) : null}
    </>
  );
}
