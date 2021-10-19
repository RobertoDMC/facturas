import { IonGrid, IonCol, IonRow, IonItem } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux'
import { Bill, BillsSlice } from '../interfaces';
import { clearAllBills } from '../store/bills/billsSlice';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import './Home.css';

interface BillItemProps {
  bill: Bill;
};

const BillItem: React.FC<BillItemProps> = ({ bill }: BillItemProps) => {

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

export default BillItem;
