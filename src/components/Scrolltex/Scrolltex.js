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
   const scrolltexButton = {
    margin:4,
	width: 40,
	height: 40,
  };

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
						<TableSymbols onTex={this.props.onTex} data={[['$\\alpha$','\\alpha'], ['$\\beta$','\\beta'],
						['$\\gamma$','\\gamma'], ['$\\delta$','\\delta'], [ '$\\epsilon$','\\epsilon'], [ '$\\varepsilon$','\\varepsilon'],
						['$\\zeta$','\\zeta'], [ '$\\eta$','\\eta'], [ '$\\theta$', '\\theta'], [ '$\\vartheta$','\\vartheta'],
						['$\\iota$','\\iota'], [ '$\\kappa$','\\kappa'], [ '$\\lambda$','\\lambda'], [ '$\\mu$','\\mu'],
						[ '$\\nu$','\\nu'], [ '$\\xi$','\\xi'], [ '$\\pi$','\\pi'], [ '$\\varpi$','\\varpi'], [ '$\\rho$','\\rho'],
						[ '$\\varrho$','\\varrho'], [ '$\\sigma$','\\sigma'], [ '$\\varsigma$','\\varsigma'], [ '$\\tau$','\\tau'],
						[ '$\\upsilon$','\\upsilon'], [ '$\\phi$','\\phi'], [ '$\\varphi$','\\varphi'], [ '$\\chi$','\\chi'], [ '$\\psi$','\\psi'], [ '$\\omega$','\\omega']]}/>	
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
						<TableSymbols onTex={this.props.onTex} data={[
						['$x^a$','^{}'], ['$x_a$','_{}'], ['$\\tfrac{x}{a}$','\\tfrac{}{}'], ['$\\frac{x}{a}$','\\frac{}{}'],
						['$x_{a}^{b}$','_{}^{}'], ['$\\frac{\\partial }{\\partial x}$','$\\frac{\\partial }{\\partial x}'], ['${x_{a}}^{b}$','{_{}}^{}'], ['$_{a}^{b}\\textrm{C}$','_{}^{}\\textrm{}'],
						['$\\frac{\\partial^2 }{\\partial x^2}$','\\frac{\\partial^2 }{\\partial x^2}'], ['$\\frac{\\mathrm{d} }{\\mathrm{d} x}$','\\frac{\\mathrm{d} }{\\mathrm{d} x}'], ['$\\int $','\\int '], ['$\\oint $','\\oint '],
						['$\\oint_{a}^{b}$','\\oint_{}^{}'], ['$\\iint_{a}^{b}$','\\iint_{}^{}'], ['$\\bigcap $','\\bigcap '], ['$\\bigcap_{a}^{b}$','\\bigcap_{}^{}'],
						['$\\lim\\limits_{x \\to 0}$','\\lim\\limits_{x \\to 0}'],['$\\sum $','\\sum '],['$\\sum_{a}^{b}$','\\sum_{}^{}'],['$\\sqrt{x}$','\\sqrt{}'],['$\\sqrt[n]{x}$','\\sqrt[]{}'],
						['$\\prod $','\\prod '],['$\\prod_{a}^{b}$','\\prod_{}^{}'],['$\\coprod $','\\coprod'],['$\\coprod_{a}^{b}$','\\coprod_{}^{}']
						]}/>	
					</Div>
				</Group>
			</ModalPage>

       
        </ModalRoot>
      
		<Group>
			<Header level="secondary">Инструменты</Header>
			
			<HorizontalScroll style={{paddingLeft:4}}>
				<Button style={scrolltexButton} onClick={() => this.setActiveModal(MODAL_PAGE_SYMBOLS)}>
					  <Latex>$\alpha$</Latex>
				</Button>
				<Button style={scrolltexButton} onClick={() => this.setActiveModal(MODAL_PAGE_EQUATIONS)}>
					  <Latex>$x^\alpha$</Latex>
				</Button>
			</HorizontalScroll>
        </Group>
    </div>
    );
  }
}


export default Scrolltex;
