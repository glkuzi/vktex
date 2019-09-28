import React from 'react';
import './Scrolltex.css';
import { HorizontalScroll,  Group, Header, Div, 
PanelHeader,FormLayout, ModalRoot, ModalPage, ModalPageHeader, Button, View, Panel, HeaderButton} from '@vkontakte/vkui';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import TableSymbols from '../TableSymbols'
import Latex from "react-latex";
const MODAL_PAGE_SYMBOLS = 'symbols';
const MODAL_PAGE_EQUATIONS = 'equations';

class Scrolltex extends React.Component {
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
   

    return (
	<div>
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
			  <Group>
					<Div> 
						<TableSymbols onTex={this.props.onTex} data={[['$\\alpha$','\\alpha'], ['$\\beta$','\\beta']]}/>	
					</Div>
				</Group>
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
				<Group>
					<Div> 
						<TableSymbols onTex={this.props.onTex} data={[['$x^y$','^{}'], ['$x_y$','_{}']]}/>	
					</Div>
				</Group>
			</ModalPage>

       
        </ModalRoot>
      
		<Group>
			<Header level="secondary">Инструменты</Header>
			
			<HorizontalScroll class="ScrolltexButton">
				<Button onClick={() => this.setActiveModal(MODAL_PAGE_SYMBOLS)}>
					  <Latex>$\alpha$</Latex>
				</Button>
				<Button onClick={() => this.setActiveModal(MODAL_PAGE_EQUATIONS)}>
					  <Latex>$x^\alpha$</Latex>
				</Button>
			</HorizontalScroll>
        </Group>
    </div>
    );
  }
}


export default Scrolltex;
