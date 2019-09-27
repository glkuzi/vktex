import React from 'react';
import './Scrolltex.css';
import { HorizontalScroll,  Group, Header,
PanelHeader,FormLayout, ModalRoot, ModalPage, ModalPageHeader, Button, View, Panel, HeaderButton} from '@vkontakte/vkui';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
const MODAL_PAGE_SYMBOLS = 'symbols';
const MODAL_PAGE_EQUATIONS = 'equations';

class Scrolltexmodal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeModal: null,
      modalHistory: []
    };

    this.modalBack = () => {
      this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
    };
  }

  setActiveModal(activeModal) {
    activeModal = activeModal || null;
    let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

    if (activeModal === null) {
      modalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
    } else {
      modalHistory.push(activeModal);
    }

    this.setState({
      activeModal,
      modalHistory
    });
  };

  render() {
    const modal = (
      <ModalRoot activeModal={this.state.activeModal}>
        <ModalPage
          id={MODAL_PAGE_SYMBOLS}
          onClose={this.modalBack}
          header={
            <ModalPageHeader
              left={<HeaderButton onClick={this.modalBack}><Icon24Cancel /></HeaderButton>}
            >
              Символы
            </ModalPageHeader>
          }
        >
          
        </ModalPage>

        <ModalPage
          id={MODAL_PAGE_EQUATIONS}
          header={
            <ModalPageHeader
              left={<HeaderButton onClick={this.modalBack}><Icon24Cancel /></HeaderButton>}
            >
              Выражения
            </ModalPageHeader>
          }
          onClose={this.modalBack}
          settlingHeight={80}
        >
        </ModalPage>

       
      </ModalRoot>
    );

    return (
	<div modal={modal}>
	    <Header level="secondary">Инструменты</Header>
        
		<HorizontalScroll>
              <Button size="xl" level="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_SYMBOLS)}>
                  Открыть символы
              </Button>
				<Button size="xl" level="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_EQUATIONS)}>
                  Открыть выражения
              </Button>
		</HorizontalScroll>
    </div>    
    );
  }
}


const itemStyle = {
    
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection:
    'column',
    alignItems: 'center',
    fontSize: 24,
	backgroundColor: 'grey',
	margin: 4,
	padding: 2
  };

class Scrolltex extends React.Component {
   render() {
     return  (
	 
	 
        <Scrolltexmodal></Scrolltexmodal>  
        
		 
		
		)
   }
}


export default Scrolltex;
