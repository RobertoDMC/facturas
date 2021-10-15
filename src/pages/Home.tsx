import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonButton, IonGrid, IonCol, IonRow, IonRouterLink } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { scan, downloadOutline } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonTitle>Home</IonTitle>
              </IonCol>
              <IonCol>
                <IonRow className="ion-justify-content-end">
                  <IonIcon icon={downloadOutline} />
                  <IonRouterLink color="primary" href="/scan">
                    <IonIcon icon={scan} />
                  </IonRouterLink>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
