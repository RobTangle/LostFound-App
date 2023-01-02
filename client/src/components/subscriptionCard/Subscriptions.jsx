import { useSelector } from "react-redux";
import { SubscriptionsCards } from "./SubscriptionsCards";
import { useTranslation } from "react-i18next";

export function Subscriptions() {
  const { t } = useTranslation();
  const userSubscriptions = useSelector(
    (state) => state.user?.userProfile?.subscriptions
  );

  return (
    <>
      {Array.isArray(userSubscriptions) && userSubscriptions.length === 0 ? (
        <div>
          <h3>{t("profile.noSubscriptions")}</h3>
        </div>
      ) : null}
      {Array.isArray(userSubscriptions) && userSubscriptions.length > 0 ? (
        <SubscriptionsCards subscriptions={userSubscriptions} />
      ) : null}
    </>
  );
}
