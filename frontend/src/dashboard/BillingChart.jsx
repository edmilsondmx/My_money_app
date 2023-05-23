import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { getList } from '../store/actions/billingCycleActions';
import { getByYear } from '../store/actions/dashboardActions';

class BillingChart extends Component {
  componentDidMount() {
    this.props.getList();
  }

  render() {
    const { list, years } = this.props;

    if (!list) return null;

    const arrayOfYears = list.map((item) => item.year).filter((item, index, self) => self.indexOf(item) === index);

    const dataPerMonth = years.map((item) => {
      const { month, year, credits, debts } = item;

      const creditValue = credits.reduce((acumulador, { value }) => acumulador + value, 0);
      const debtsValue = debts.reduce((acumulador, { value }) => acumulador + value, 0);
      const consolidated = creditValue - debtsValue;

      return {
        month: `${month}/${year}`,
        Créditos: creditValue,
        Débitos: debtsValue,
        Consolidado: consolidated,
      };
    });

    dataPerMonth.sort((a, b) => {
      const [monthA, yearA] = a.month.split('/');
      const [monthB, yearB] = b.month.split('/');
      return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
    });
    const width = (window.innerWidth / 100) * 80;
    const height = (window.innerHeight / 100) * 30;

    const handleYearChange = (e) => {
      const year = e.target.value || '2017';
      this.props.getByYear(year);
    };

    return (
      <div className="d-flex flex-column justify-content-center align-items-center mt-4">
        <div className="d-flex justify-content-center align-items-center select mb-4">
          <i className="fa-regular fa-calendar-check me-2 fs-3"></i>
          <select onChange={handleYearChange}>
            <option disabled className="item" selected>
              Selecione o ano
            </option>
            {arrayOfYears.map((item) => (
              <option className="item" key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {years.length === 0 ? (
          <div className="border text-danger border-danger bg-danger bg-opacity-10 rounded py-4 px-4" role="alert">
            <h3>Selecione um ano para carregar gráfico!</h3>
          </div>
        ) : (
          <BarChart
            width={width}
            height={height}
            data={dataPerMonth}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="text-center" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Créditos" fill="#00A65A" />
            <Bar dataKey="Débitos" fill="#DD4B39" />
            <Bar dataKey="Consolidado" fill="#00619B" />
          </BarChart>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ list: state.billingCycle.list, years: state.dashboard.year });
const mapDispatchToProps = (dispatch) => bindActionCreators({ getList, getByYear }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BillingChart);
