import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContentHeader from '../common/template/ContentHeader';
import Content from '../common/template/Content';
import ValueBox from '../common/widget/ValueBox';
import Row from '../common/layout/Row';
import BillingChart from './BillingChart';
import Loader from '../common/template/Loader';

import { getSummary } from '../store/actions/dashboardActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getSummary();
  }
  render() {
    const { credit, debt } = this.props.summary;

    return (
      <div>
        <ContentHeader title="Dashboard" small="Versão 1.0" />
        <Content>
          <Row>
            <ValueBox
              cols="12 8 6 4"
              color="green"
              icon="bank"
              value={credit.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              text="Total de Créditos"
            />

            <ValueBox
              cols="12 8 6 4"
              color="red"
              icon="credit-card"
              value={debt.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              text="Total de Débitos"
            />

            <ValueBox
              cols="12 8 6 4"
              color="blue"
              icon="money"
              value={(credit - debt).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
              text="Valor Consolidado"
            />
          </Row>
          <Row>
            <BillingChart />
          </Row>
        </Content>
        <Loader />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ summary: state.dashboard.summary });

const mapDispatchToProps = (dispatch) => bindActionCreators({ getSummary }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
