import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonCol, IonRow, IonList, IonItem } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux'
import { scan, downloadOutline, trashOutline } from 'ionicons/icons';
import { Bill, BillsSlice } from '../interfaces';
import { clearAllBills, exportBills } from '../store/bills/billsSlice';

import BillItem from '../components/BillItem';
import { createStorage, getItem } from '../services/storage';
import './Home.css';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state: BillsSlice) => state.bills);

  useEffect(() => {
    createStorage();    
  }, []);

  const downloadBills = async () => {
    dispatch(exportBills({}));
  };

  const clearBills = () => {
  getItem('bills').then((data: any) => {
    console.log(data);
    dispatch(clearAllBills({}));
  });
  };

  const renderBillItem = (bill: Bill) => {
    return <BillItem bill={bill} />;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="4">
                <IonTitle>Home</IonTitle>
              </IonCol>
              <IonCol size="8">
                <IonRow className="ion-justify-content-end">
                  <IonItem onClick={clearBills}>
                    <IonIcon icon={trashOutline} />
                  </IonItem>
                  <IonItem onClick={downloadBills}>
                    <IonIcon icon={downloadOutline} />
                  </IonItem>
                  <IonItem routerLink="/scan">
                    <IonIcon icon={scan} />
                  </IonItem>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {bills.map(renderBillItem)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
