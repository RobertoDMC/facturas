import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonCol, IonRow, IonList, IonItem } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux'
import { scan, downloadOutline, trashOutline } from 'ionicons/icons';
import { Bill, BillsSlice } from '../interfaces';
import { clearAllBills } from '../store/bills/billsSlice';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import './Home.css';
import BillItem from '../components/BillItem';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state: BillsSlice) => state.bills);

  const downloadBills = async () => {
    await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: "This is a test",
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };

  const clearBills = () => {
    dispatch(clearAllBills({}));
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
