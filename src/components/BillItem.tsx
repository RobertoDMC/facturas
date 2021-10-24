import { IonGrid, IonCol, IonRow, IonItem } from '@ionic/react';
import { Bill } from '../interfaces';
import { createGesture, Gesture, GestureDetail } from '@ionic/core';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { removeBill } from '../store/bills/billsSlice';

interface BillItemProps {
  bill: Bill;
};


const BillItem: React.FC<BillItemProps> = ({ bill }: BillItemProps) => {

  const itemRef = useRef<any>(null);

  const dispatch = useDispatch();

  let gesture: Gesture;

  useEffect(() => {
    if (itemRef !== null) {
      gesture = createGesture({
        el: itemRef.current,
        threshold: 15,
        gestureName: 'swipe',
        onStart: ev => onMoveStart(ev),
        onMove: ev => onMoveHandler(ev),
        onEnd: ev => onMoveEnd(ev),
      });
      gesture.enable();
    }
  }, [itemRef]);

  const onMoveStart = (detial: GestureDetail) => {

  };
  
  const onMoveEnd = (detail: GestureDetail) => {
    if (detail.deltaX > 150) {
      dispatch(removeBill(bill));
    } else {
      itemRef.current.style.transform = `translateX(0px)`;
      itemRef.current.style.background = '#FFFFFF';
    }
  };

  const onMoveHandler = (detail: GestureDetail) => {
    if (detail.deltaX > 0) {
      itemRef.current.style.transform = `translateX(${detail.deltaX}px)`;
      itemRef.current.style.background = getRedBackgroundColor(detail.deltaX);
    }
  };

  const getRedBackgroundColor = (deltaX: number) => {

    if (deltaX > 150) {
      return '#FF0000';
    } else {
      return `#FF${(255 - Math.round(deltaX)).toString(16)}${(255 - Math.round(deltaX)).toString(16)}`;
    }
  };

  return (
    <IonItem>
      <IonGrid>
        <IonRow className="ion-align-items-center" ref={itemRef}>
          <IonCol size="1">
            {bill.n}
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
