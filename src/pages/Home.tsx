import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonCol, IonRow, IonList, IonItem } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux'
import { scan, downloadOutline, trashOutline } from 'ionicons/icons';
import './Home.css';
import { Bill, BillsSlice } from '../interfaces';
import { clearAllBills } from '../store/bills/billsSlice';
import { File } from '@ionic-native/file';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state: BillsSlice) => state.bills);

  const downloadBills = async () => {
    console.log(File.externalApplicationStorageDirectory);
    console.log(File.externalDataDirectory);
    console.log(File.dataDirectory);
    console.log(File.applicationDirectory);
    const result = await File.writeFile(File.externalApplicationStorageDirectory, "myItem.txt", "text");
  };

  const clearBills = () => {
    dispatch(clearAllBills({}));
  };

  const renderBillItem = (bill: Bill) => {
    return (
      <IonItem>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="1">
              {Number(bill.n) + 1}
            </IonCol>
            <IonCol size="11">
              <IonRow><IonCol>NIT: {bill.nit}</IonCol></IonRow>
              <IonRow><IonCol>Nº Factura: {bill.billNumber}</IonCol></IonRow>
              <IonRow><IonCol>Autorizacion: {bill.authorization}</IonCol></IonRow>
              <IonRow><IonCol>Fecha: {bill.date}</IonCol></IonRow>
              <IonRow><IonCol>Codigo de Control: {bill.controlCode}</IonCol></IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    );
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
