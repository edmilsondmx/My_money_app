import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ContentHeader from '../common/template/ContentHeader';
import Content from '../common/template/Content';
import Tabs from '../common/tab/Tabs';
import TabsHeader from '../common/tab/TabsHeader';
import TabsContent from '../common/tab/TabsContent';
import TabHeader from '../common/tab/TabHeader';
import TabContent from '../common/tab/TabContent';
import BillingCycleList from './BillingCycleList';
import BillingCycleForm from './BillingCycleForm';

import { create, update, remove, init } from '../store/actions/billingCycleActions';

class BillingCycle extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div>
        <ContentHeader title="Ciclos de Pagamentos" small="Cadastro" />
        <Content>
          <Tabs>
            <TabsHeader>
              <TabHeader label="Listar" icon="bars" target="tabList" />
              <TabHeader label="Incluir" icon="plus" target="tabCreate" />
              <TabHeader label="Alterar" icon="pencil" target="tabUpdate" />
              <TabHeader label="Excluir" icon="trash-o" target="tabDelete" />
            </TabsHeader>
            <TabsContent>
              <TabContent id="tabList">
                <BillingCycleList />
              </TabContent>
              <TabContent id="tabCreate">
                <BillingCycleForm submitLabel="Incluir" submitClass="primary" onSubmit={this.props.create} />
              </TabContent>
              <TabContent id="tabUpdate">
                <BillingCycleForm submitLabel="Alterar" submitClass="info" onSubmit={this.props.update} />
              </TabContent>
              <TabContent id="tabDelete">
                <BillingCycleForm
                  submitLabel="Excluir"
                  submitClass="danger"
                  readOnly={true}
                  onSubmit={this.props.remove}
                />
              </TabContent>
            </TabsContent>
          </Tabs>
        </Content>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ create, update, remove, init }, dispatch);

export default connect(null, mapDispatchToProps)(BillingCycle);
