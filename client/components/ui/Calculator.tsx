'use client';

import { useState } from 'react';
import { Card3D } from './Card3D';

type CalculationType = 'roi' | 'production' | 'feed' | 'profit';

interface CalculationField {
  id: string;
  label: string;
  placeholder: string;
  unit: string;
  type: 'number';
}

const calculationTypes: Record<CalculationType, {
  title: string;
  description: string;
  fields: CalculationField[];
  calculate: (values: Record<string, number>) => { result: number; explanation: string };
}> = {
  roi: {
    title: 'ROI Calculator',
    description: 'Calculate return on investment for your farm projects',
    fields: [
      { id: 'investment', label: 'Initial Investment', placeholder: '10000', unit: 'RM', type: 'number' },
      { id: 'returns', label: 'Expected Returns', placeholder: '15000', unit: 'RM', type: 'number' },
      { id: 'period', label: 'Time Period', placeholder: '12', unit: 'months', type: 'number' },
    ],
    calculate: (values) => {
      const roi = ((values.returns - values.investment) / values.investment) * 100;
      const annualRoi = (roi / values.period) * 12;
      return {
        result: annualRoi,
        explanation: `Annual ROI based on investment of RM${values.investment} over ${values.period} months`
      };
    }
  },
  production: {
    title: 'Production Estimator',
    description: 'Estimate your farm production output',
    fields: [
      { id: 'units', label: 'Number of Units', placeholder: '100', unit: 'units', type: 'number' },
      { id: 'rate', label: 'Production Rate', placeholder: '10', unit: 'per unit', type: 'number' },
      { id: 'efficiency', label: 'Efficiency Factor', placeholder: '85', unit: '%', type: 'number' },
    ],
    calculate: (values) => {
      const production = values.units * values.rate * (values.efficiency / 100);
      return {
        result: production,
        explanation: `Estimated production with ${values.efficiency}% efficiency`
      };
    }
  },
  feed: {
    title: 'Feed Calculator',
    description: 'Calculate feed requirements and costs',
    fields: [
      { id: 'animals', label: 'Number of Animals', placeholder: '50', unit: 'animals', type: 'number' },
      { id: 'consumption', label: 'Daily Consumption', placeholder: '2.5', unit: 'kg/day', type: 'number' },
      { id: 'cost', label: 'Feed Cost', placeholder: '3', unit: 'RM/kg', type: 'number' },
    ],
    calculate: (values) => {
      const monthlyCost = values.animals * values.consumption * values.cost * 30;
      return {
        result: monthlyCost,
        explanation: `Monthly feed cost for ${values.animals} animals`
      };
    }
  },
  profit: {
    title: 'Profit Calculator',
    description: 'Calculate expected profit margins',
    fields: [
      { id: 'revenue', label: 'Monthly Revenue', placeholder: '50000', unit: 'RM', type: 'number' },
      { id: 'costs', label: 'Operating Costs', placeholder: '30000', unit: 'RM', type: 'number' },
      { id: 'tax', label: 'Tax Rate', placeholder: '20', unit: '%', type: 'number' },
    ],
    calculate: (values) => {
      const profit = values.revenue - values.costs;
      const afterTax = profit * (1 - values.tax / 100);
      return {
        result: afterTax,
        explanation: `Monthly profit after ${values.tax}% tax`
      };
    }
  }
};

export const Calculator = () => {
  const [selectedType, setSelectedType] = useState<CalculationType>('roi');
  const [values, setValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ value: number; explanation: string } | null>(null);

  const handleCalculate = () => {
    const calculation = calculationTypes[selectedType];
    const requiredFields = calculation.fields.map(f => f.id);
    const hasAllFields = requiredFields.every(field => values[field] !== undefined);

    if (hasAllFields) {
      const { result, explanation } = calculation.calculate(values);
      setResult({ value: result, explanation });
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [id]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Calculator Type Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {(Object.keys(calculationTypes) as CalculationType[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type);
              setResult(null);
              setValues({});
            }}
            className={`p-4 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedType === type
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
            }`}
          >
            {calculationTypes[type].title}
          </button>
        ))}
      </div>

      <Card3D className="bg-white rounded-2xl p-6 shadow-xl">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {calculationTypes[selectedType].title}
            </h3>
            <p className="text-gray-600 mt-1">
              {calculationTypes[selectedType].description}
            </p>
          </div>

          <div className="grid gap-6">
            {calculationTypes[selectedType].fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={values[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="block w-full rounded-lg border-gray-300 pl-4 pr-12 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-gray-500 sm:text-sm">{field.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-lg px-4 py-2 hover:from-emerald-600 hover:to-teal-500 transition-all duration-200"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <div className="text-lg font-semibold text-emerald-700">
                Result: {result.value.toFixed(2)}
              </div>
              <div className="text-sm text-emerald-600 mt-1">
                {result.explanation}
              </div>
            </div>
          )}
        </div>
      </Card3D>
    </div>
  );
}; 