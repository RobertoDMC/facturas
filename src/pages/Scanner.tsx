import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { addBill } from '../store/bills/billsSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { arrowBack } from 'ionicons/icons';
import './Scanner.css';
import { Dialogs, DialogsPromptCallback } from '@ionic-native/dialogs';
import { Toast } from '@ionic-native/toast';

const Scanner: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    dispatch(addBill(data.text));
    Dialogs.prompt('Desea scanear mas facturas?', 'Continuar?', ['Continuar', 'Cancelar'])
      .then((result: DialogsPromptCallback) => {
        if (result.buttonIndex === 1) {
          openScanner();
        } else {
          history.goBack();
        }
      })
      .catch(() => {
        Toast.show('Hubo un problema inesperado', '1500', 'bottom');
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow className='ion-align-items-center'>
              <IonCol size='2'>
                <IonItem routerLink='/home'>
                  <IonIcon icon={arrowBack} />
                </IonItem>
              </IonCol>
              <IonCol size='10'>
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
