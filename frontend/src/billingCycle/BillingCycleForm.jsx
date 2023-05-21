import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LabelAndInput from '../common/form/LabelAndInput';
import ItemList from './ItemList';
import Sumary from './Sumary';

import { init } from '../store/actions/billingCycleActions';

class BillingCycleForm extends Component {
  calculateSummary() {
    const sum = (t, v) => t + v;
    return {
      sumOfCredits: this.props.credits.map((credit) => +credit.value || 0).reduce(sum),
      sumOfDebts: this.props.debts.map((debt) => +debt.value || 0).reduce(sum),
    };
  }
  render() {
    const { handleSubmit, readOnly, credits, debts } = this.props;
    const { sumOfCredits, sumOfDebts } = this.calculateSummary();
    return (
      <form onSubmit={handleSubmit}>
        <div className="box-body">
          <Field
            name="name"
            component={LabelAndInput}
            label="Nome"
            cols="12 4"
            type="text"
            placeholder="Informe o nome"
            readOnly={readOnly}
          />
          <Field
            name="month"
            component={LabelAndInput}
            label="Mês"
            cols="12 4"
            type="number"
            placeholder="Informe o mês"
            readOnly={readOnly}
          />
          <Field
            name="year"
            component={LabelAndInput}
            label="Ano"
            cols="12 4"
            type="number"
            placeholder="Informe o ano"
            readOnly={readOnly}
          />
          <Sumary credits={sumOfCredits} debts={sumOfDebts} />
          <ItemList list={credits} legend="Créditos" field="credits" readOnly={readOnly} cols="12 6" />
          <ItemList list={debts} legend="Débitos" field="debts" showStatus={true} readOnly={readOnly} cols="12 6" />
        </div>
        <div className="box-footer">
          <button type="submit" className={`btn btn-${this.props.submitClass} me-2`}>
            {this.props.submitLabel}
          </button>
          <button type="button" className="btn btn-secondary" onClick={this.props.init}>
            Cancelar
          </button>
        </div>
      </form>
    );
  }
}

const BillingCycleFormRedux = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm);
const selector = formValueSelector('billingCycleForm');

const mapStateToProps = (state) => ({ credits: selector(state, 'credits'), debts: selector(state, 'debts') });
const mapDispatchToProps = (dispatch) => bindActionCreators({ init }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleFormRedux);
