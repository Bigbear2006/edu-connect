import { deleteChangeRole } from '../api/admin';
import { changeRoleUser } from '../api/user';
import { Bid } from '../types/bid';

type Props = {
  bids: Bid[];
  setBids: React.Dispatch<React.SetStateAction<Bid[]>>;
};

export const BidRole = ({ bids, setBids }: Props) => {
  const handleAcceptClick = async (idUser: string, idBid: string, role: string) => {
    try {
      await changeRoleUser(idUser, role);
      await deleteChangeRole(idBid);

      const updatedBids = bids.filter((bid) => bid.id !== idBid);
      setBids(updatedBids);
    } catch (error) {
      console.error('Ошибка при изменении роли или удалении заявки:', error);
    }
  };

  const handleDenialClick = async (idUser: string, idBid: string, role: string) => {
    try {
      await changeRoleUser(idUser, role);
      await deleteChangeRole(idBid);

      const updatedBids = bids.filter((bid) => bid.id !== idBid);
      setBids(updatedBids);
    } catch (error) {
      console.error('Ошибка при изменении роли или удалении заявки:', error);
    }
  };

  return (
    <div className="admin">
      <div className="admin__title">Заявки на изменение ролей</div>
      <div className="admin__items">
        {bids.map((bid) => (
          <div key={bid.id} className="admin__item">
            <div className="admin__item-username">{bid.user.username}</div>
            <div className="admin__item-role">{bid.role}</div>
            <div className="admin__item-buttons">
              <button
                onClick={() => handleAcceptClick(bid.user.id, bid.id, bid.role)}
                className="admin__item-btn admin__item-btn-accept">
                Принять
              </button>
              <button
                onClick={() => handleDenialClick(bid.user.id, bid.id, bid.user.role)}
                className="admin__item-btn">
                Отказать
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
