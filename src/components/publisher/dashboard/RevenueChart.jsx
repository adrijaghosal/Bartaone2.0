import React, { useState, useRef, useEffect } from 'react';
import { 
  FiCalendar, 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown,
  FiMoreVertical,
  FiDownload
} from 'react-icons/fi';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import { format, formatCurrency } from '../../../utils/formatters';

const RevenueChart = ({ 
  data = [], 
  timeRange = '7d',
  className = '',
}) => {
  const [hoveredData, setHoveredData] = useState(null);
  const [chartType, setChartType] = useState('revenue'); // 'revenue', 'views', 'subscribers'
  const chartRef = useRef(null);

  // Calculate stats from data
  const totalRevenue = data.reduce((sum, d) => sum + (d.revenue || 0), 0);
  const averageRevenue = data.length > 0 ? totalRevenue / data.length : 0;
  const maxRevenue = data.length > 0 ? Math.max(...data.map(d => d.revenue || 0)) : 0;
  
  const maxValue = chartType === 'revenue' ? maxRevenue : 
                   chartType === 'views' ? Math.max(...data.map(d => d.views || 0)) :
                   Math.max(...data.map(d => d.subscribers || 0));

  const getChartData = () => {
    if (chartType === 'revenue') {
      return data.map(d => ({ label: d.label, value: d.revenue || 0 }));
    } else if (chartType === 'views') {
      return data.map(d => ({ label: d.label, value: d.views || 0 }));
    } else {
      return data.map(d => ({ label: d.label, value: d.subscribers || 0 }));
    }
  };

  const chartData = getChartData();

  // Format labels based on time range
  const formatLabel = (label) => {
    if (timeRange === '7d') {
      return label;
    } else if (timeRange === '30d') {
      return label.substring(0, 3);
    } else {
      return label;
    }
  };

  // Get color based on value
  const getBarColor = (value, max) => {
    const percentage = max > 0 ? value / max : 0;
    if (percentage > 0.8) return 'bg-terracotta-500';
    if (percentage > 0.6) return 'bg-terracotta-400';
    if (percentage > 0.4) return 'bg-orange-400';
    if (percentage > 0.2) return 'bg-yellow-500';
    return 'bg-warmBeige-600';
  };

  // Get gradient color
  const getGradientColor = (value, max) => {
    const percentage = max > 0 ? value / max : 0;
    if (percentage > 0.8) return 'from-terracotta-500 to-orange-500';
    if (percentage > 0.6) return 'from-orange-400 to-yellow-500';
    if (percentage > 0.4) return 'from-yellow-400 to-yellow-600';
    if (percentage > 0.2) return 'from-yellow-500 to-warmBeige-500';
    return 'from-warmBeige-600 to-warmBeige-700';
  };

  const chartTypes = [
    { value: 'revenue', label: 'Revenue', icon: <FiDollarSign /> },
    { value: 'views', label: 'Views', icon: <FiTrendingUp /> },
    { value: 'subscribers', label: 'Subscribers', icon: <FiTrendingUp /> },
  ];

  return (
    <Card variant="glass" padding="lg" className={className}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-warmBeige-100 flex items-center gap-2">
            <FiDollarSign className="text-terracotta-400" />
            Revenue Overview
          </h3>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-2xl font-bold text-warmBeige-100">
              {formatCurrency(totalRevenue)}
            </span>
            <Badge variant="glass" size="sm">
              Avg. {formatCurrency(averageRevenue)}/day
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Chart Type Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-navy-800/50 border border-warmBeige-500/10">
            {chartTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setChartType(type.value)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${chartType === type.value 
                    ? 'bg-terracotta-500 text-white' 
                    : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                  }
                `}
              >
                {type.icon}
                {type.label}
              </button>
            ))}
          </div>

          <button className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all">
            <FiDownload size={18} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative" ref={chartRef}>
        {/* Chart Grid */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs text-warmBeige-500">
            <span>${maxValue}</span>
            <span>${maxValue / 2}</span>
            <span>$0</span>
          </div>
          <div className="relative h-48 md:h-64">
            {/* Bars */}
            <div className="absolute inset-0 flex items-end gap-1">
              {chartData.map((item, index) => {
                const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                const isHovered = hoveredData === index;
                
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center group"
                    onMouseEnter={() => setHoveredData(index)}
                    onMouseLeave={() => setHoveredData(null)}
                  >
                    <div 
                      className={`
                        w-full rounded-t-lg transition-all duration-300 cursor-pointer
                        ${getBarColor(item.value, maxValue)}
                        ${isHovered ? 'opacity-100 scale-y-105' : 'opacity-80 hover:opacity-100'}
                      `}
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    />
                    <div className="text-center mt-2">
                      <span className="text-xs font-medium text-warmBeige-400 transition-colors group-hover:text-warmBeige-100">
                        {formatLabel(item.label)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tooltip */}
        {hoveredData !== null && chartData[hoveredData] && (
          <div 
            className="absolute bg-navy-800/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-xl p-3 shadow-2xl pointer-events-none transition-all duration-200"
            style={{
              bottom: 'calc(100% + 10px)',
              left: `${(hoveredData / (chartData.length - 1)) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <p className="text-sm font-semibold text-warmBeige-100">
              {chartData[hoveredData].label}
            </p>
            <p className="text-lg font-bold text-terracotta-400">
              {chartType === 'revenue' 
                ? formatCurrency(chartData[hoveredData].value)
                : chartData[hoveredData].value
              }
            </p>
            <p className="text-xs text-warmBeige-400">
              {chartType === 'revenue' ? 'Revenue' : 
               chartType === 'views' ? 'Views' : 'Subscribers'}
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-warmBeige-500/10">
        <div className="text-center">
          <p className="text-sm text-warmBeige-400">Total</p>
          <p className="text-lg font-semibold text-warmBeige-100">
            {chartType === 'revenue' 
              ? formatCurrency(totalRevenue)
              : totalRevenue
            }
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-warmBeige-400">Average</p>
          <p className="text-lg font-semibold text-warmBeige-100">
            {chartType === 'revenue' 
              ? formatCurrency(averageRevenue)
              : averageRevenue.toFixed(0)
            }
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-warmBeige-400">Peak</p>
          <p className="text-lg font-semibold text-warmBeige-100">
            {chartType === 'revenue' 
              ? formatCurrency(maxValue)
              : maxValue
            }
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RevenueChart;