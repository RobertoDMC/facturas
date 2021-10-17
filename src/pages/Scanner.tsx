import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";
import { addBill } from '../store/bills/billsSlice';
import { useDispatch } from 'react-redux';
import { Bill } from '../classes/bill';
import { arrowBack } from 'ionicons/icons';
import './Scanner.css';

const Scanner: React.FC = () => {
  const dispatch = useDispatch();

  const openScanner = async () => {
    const x: string = "1009445021|17480|263401100172312|12/10/2021|31.83|31.83|90-CD-65-07-28|5225670|0|0|0|0"
    const bill = Bill.getBill(x);
    dispatch(addBill(bill));
    /* const status: QRScannerStatus = await QRScanner.prepare();
    if (status.authorized) {
      let scan = QRScanner.scan().subscribe((text: string) => {
        dispatch(addBill(text));
        addBill(text);
        scan.unsubscribe();
      })
    } */
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="2">
                <IonItem routerLink="/home">
                  <IonIcon icon={arrowBack} />
                </IonItem>
              </IonCol>
              <IonCol size="10">
                <IonTitle>Scanner</IonTitle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={openScanner}>Scan barcode</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
