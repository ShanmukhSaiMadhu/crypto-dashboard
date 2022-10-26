import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BarChart from "../components/DashboardComponents/BarChart";
import Header from "../components/Header";
import Loader from "../components/Loader";
import CoinPageList from "../components/CoinPageComponents/CoinPageList";
import CoinPageDesc from "../components/CoinPageComponents/CoinPageDesc";
import { Button } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import { getDaysArray } from "../functions/getDaysArray";
import { getPrices } from "../functions/getPrices";
import { getPriorDate } from "../functions/getPriorDate";
import { getCoinData } from "../functions/getCoinData";
import ColorToggleButton from "../components/CoinPageComponents/Toggle";
import { convertNumbers } from "../functions/convertNumbers";

function CoinPage() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [prices, setPrices] = useState([]);
  const [type, setType] = useState("prices");
  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - days));

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        borderWidth: 2,
        fill: true,
        tension: 0.25,
        backgroundColor: "transparent",
        borderColor: "white",
        pointRadius: 0,
      },
    ],
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    aspectRatio: 3,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        ticks:
          type == "market_caps"
            ? {
                callback: function (value) {
                  return "$" + convertNumbers(value);
                },
              }
            : type == "total_volumes"
            ? {
                callback: function (value) {
                  return convertNumbers(value);
                },
              }
            : {
                callback: function (value, index, ticks) {
                  return "$" + value.toLocaleString();
                },
              },
      },
    },
  };
  
  useEffect(() => {
    if (searchParams) {
      getData();
    }
  }, [searchParams]);

  const getData = async () => {
    const response_data = await getCoinData(searchParams, true);
    setData(response_data);
    console.log(response_data)
    const prices_data = await getPrices(response_data.id, days, type);
    setPrices(prices_data)
    var dates = getDaysArray(priorDate, today);
    prices_data?.[`${days}`][1] < prices_data?.[0][1] 
    ? setChartData({
      labels: dates,
      datasets: [
        {
          data: prices_data?.map((data) => data[1]),
          borderWidth: 2,
          fill: true,
          tension: 0.25,
          backgroundColor: "rgba(249,65,65, 0.2)",
          borderColor: "#f94141",
          pointRadius: 0,
        },
      ],
    })
    : setChartData({
        labels: dates,
        datasets: [
          {
            data: prices_data?.map((data) => data[1]),
            borderWidth: 2,
            fill: true,
            tension: 0.25,
            backgroundColor: "rgba(47,222,70, 0.2)",
            borderColor: "#61c96f",
            pointRadius: 0,
          },
        ],
      });

    setLoadingChart(false);
    setLoading(false);

    setCoin({
      id: response_data.id,
      name: response_data.name,
      symbol: response_data.symbol,
      image: response_data.image.large,
      price_change_percentage_24h:
        response_data.market_data.price_change_percentage_24h,
      total_volume: response_data.market_data.total_volume.usd,
      current_price: response_data.market_data.current_price.usd,
      market_cap: response_data.market_data.market_cap.usd,
    });
  };

  const handleChange = async (event) => {
    setDays(event.target.value);
    const prices_data = await getPrices(data.id, event.target.value, type);
    setPrices(prices_data);
    const priorDate = getPriorDate(event.target.value);
    var dates = getDaysArray(priorDate, today);

    prices_data?.[`${event.target.value}`][1] < prices_data?.[0][1] 
    ? setChartData({
      labels: dates,
      datasets: [
        {
          data: prices_data?.map((data) => data[1]),
          borderColor: "#f94141",
        },
      ],
    })
    : setChartData({
      labels: dates,
      datasets: [
        {
          data: prices_data?.map((data) => data[1]),
          borderColor: "#61c96f",
        },
      ],
    });
  };

  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth < 620) {
        setIsMobile(true);
      }
    }
  }, []);

  return (
    <>
      {loading && loadingChart ? (
        <Loader />
      ) : (
        <>
          <Header />
          <CoinPageList coin={coin} delay={2} />
          <div className="coin-page-div">
            <div className="toggle-wrapper">
              <div className="toggle-flex">
                <ColorToggleButton
                  type={type}
                  setType={setType}
                  days={days}
                  chartData={chartData}
                  setChartData={setChartData}
                  id={data.id}
                />
              </div>
              <div className="graph-btns">
                <ButtonGroup variant="outlined" size={isMobile ? "small" : "medium"} aria-label="button group">
                  <Button className="graph-btn" onClick={handleChange} value={7}>1W</Button>
                  <Button className="graph-btn" onClick={handleChange} value={30}>1M</Button>
                  <Button className="graph-btn" onClick={handleChange} value={60}>3M</Button>
                  <Button className="graph-btn" onClick={handleChange} value={365}>1Y</Button>
                </ButtonGroup>
            </div>
            </div>
            
            <BarChart chartData={chartData} options={options} />
            
          </div>
          {console.log("new testttt",data.links.homepage[0])}
          
          <CoinPageDesc name={data.name} desc={data.description.en} officialPage={data.links.homepage[0]
} />
        </>
      )}
    </>
  );
}

export default CoinPage;