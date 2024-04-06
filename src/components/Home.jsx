import React from "react";

import '../styles/main.css'
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Slider from 'react-slick';
import '../scipts/animate'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TradingViewWidgetWrapper from "./TradingViewWrapper";

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [mainCoin, setMainCoin] = useState('BTC');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [mainCoinData, setMainCoinData] = useState();
    const [mainCoinName, setMainCoinName] = useState('bitcoin');


    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 800,
        slidesToShow: 1.2,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const settingsForSparklineCharts = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 800,
        slidesToShow: 3.2,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    useEffect(() => {

        const fetchTrending = async () => {
            const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
            // console.log(res.data.coins);
            setCoins(res.data.coins)

        }
        fetchTrending();
        fetchMainCoinData(mainCoinName);
        console.log(mainCoin);
    }, [mainCoin])

    const fetchSearchCoins = async (value) => {
        try {
            const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${value}`);
            setSearchResults(res.data.coins);
            setSearchText(value)
            setShowSearchResults(res.data.coins && res.data.coins.length > 0);
            console.log(res.data.coins);
        } catch (e) {
            console.log(e);
        }


    }

    const handleSearchBarChange = (value) => {
        fetchSearchCoins(value);

    }
    const handleCoinChange = (value, id) => {
        setMainCoin(value);
        setShowSearchResults(false);
        setSearchText('');
        setMainCoinName(id);
        fetchMainCoinData(mainCoinName);

    }
    const fetchMainCoinData = async (id) => {
        try {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
            console.log(res.data);
            setMainCoinData(res.data);

        } catch (e) {
            console.log(e)
        };
    }


    return <>
        <div className="uni-up-margin">

            <div className="search-container container">
                <input className="search-bar" placeholder="Search for coin" value={searchText} type="search" onChange={(e) => handleSearchBarChange(e.target.value)} />
                <div className={`search-results &#8377;{showSearchResults ? '':'search-none'}`}>
                    {showSearchResults && searchResults !== null && Array.isArray(searchResults) && searchResults.slice(0, 20).map((coin, index) => (
                        <div className="search-items trending-list-small-flex align-left" onClick={() => handleCoinChange(coin.symbol, coin.id)}>
                            <img src={coin.thumb} alt="" className="sm-logo-coin" />
                            <p className="title-coin">{coin.name}</p>
                        </div>
                    ))}
                </div>

            </div>

            <div className="mega-cont">



                <div className="col-1">

                    <div className="chart-cont">

                        <TradingViewWidgetWrapper key={mainCoin} coinName={mainCoin}></TradingViewWidgetWrapper>
                    </div>



                    <div className="performance-cont">
                        <div className="scrollable-list">
                            <a href="" className="scroll-item"></a>
                            <a href="" className="scroll-item">Overview</a>
                            <a href="#Fundamentals" className="scroll-item">Fundamentals</a>
                            <a href="" className="scroll-item">News</a>
                            <a href="#Sentiments" className="scroll-item">Sentiments</a>
                            <a href="#Team" className="scroll-item">Team</a>
                            <a href="" className="scroll-item">Technicals</a>
                            <a href="#Tokenomics" className="scroll-item">Tokenomics</a>
                        </div>
                        <div className="sub-performance-cont">
                            <h1 className="title color-black align-left-text">Performance</h1>

                            <div className="performance-list">
                                <div className="reveal-from-left performance-col-left text-sm color-black">
                                    <p className="gray-text">Today's Low</p>
                                    <p className="bold-num">&#8377;{mainCoinData?.market_data.low_24h.inr}</p>
                                </div>
                                <img className=" reveal-from-right performance-col-middle" src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709643278/koinx/Group_27607_wyhasp.png" alt="" />
                                <div className="performance-col-right text-sm color-black">
                                    <p className="gray-text"> Today's High</p>
                                    <p className="bold-num">&#8377;{mainCoinData?.market_data.high_24h.inr}</p>
                                </div>


                            </div>

                            <div className=" reveal-from-left performance-list">
                                <div className="performance-col-left text-sm color-black">
                                    <p className="gray-text"> All time Low</p>
                                    <p className="bold-num">&#8377;{mainCoinData?.market_data.atl.inr}</p>
                                </div>
                                <img className=" reveal-from-right performance-col-middle" src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709644639/koinx/div.pbar29RangesliderWrapper_margin_o3ktrm.png" alt="" />
                                <div className="performance-col-right text-sm color-black">
                                    <p className="gray-text">All Time High</p>
                                    <p className="bold-num">&#8377;{mainCoinData?.market_data.ath.inr}</p>
                                </div>
                            </div>

                        </div>
                        <div id="Fundamentals" className="sub-fundamentals-cont">
                            <div className="title color-black align-left-text title-med gray-text">
                                Fundamentals <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709646666/koinx/SVG_margin_efccv1.png" alt="" />
                            </div>

                            <div className="mega-fundamental-cont display-flex-betwn">
                                <div className="fundamental-columns">

                                    <div className="reveal-from-left display-flex-betwn">
                                        <p key={mainCoinData} className="text-sm gray-text">{mainCoinData?.name}</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.current_price.inr}</p>
                                    </div>
                                    <div className="horizontal-line"></div>

                                    <div className="reveal-from-left display-flex-betwn">
                                        <p key={mainCoinData} className="text-sm gray-text">Price Change 24H</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.price_change_24h_in_currency.inr}</p>
                                    </div>
                                    <div className="horizontal-line"></div>


                                    <div className=" reveal-from-left display-flex-betwn">
                                        <p className="text-sm gray-text">24h high/24h low</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.high_24h.inr} / &#8377;{mainCoinData?.market_data.low_24h.inr}</p>
                                    </div>
                                    <div className="horizontal-line"></div>


                                    <div className="horizontal-line"></div>
                                    <div className="reveal-from-left display-flex-betwn">
                                        <p className="text-sm gray-text">Total Volume</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.total_volume.inr}/</p>
                                    </div>
                                    <div className="horizontal-line"></div>

                                    <div className="reveal-from-left display-flex-betwn">
                                        <p className="text-sm gray-text">Market Cap Rank</p>
                                        <p className="text-sm bold-num color-black">{mainCoinData?.market_data.market_cap_rank}</p>
                                    </div>
                                    <div className="horizontal-line"></div>
                                </div>

                                <div className="fundamental-columns">
                                    <div className="reveal-from-right display-flex-betwn">
                                        <p className="text-sm gray-text">Market Cap</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.market_cap.inr}</p>
                                    </div>
                                    <div className="horizontal-line"></div>


                                    <div className="reveal-from-right display-flex-betwn">
                                        <p className="text-sm gray-text">Price Change 24H %</p>
                                        <p className="text-sm bold-num color-black">%{mainCoinData?.market_data.price_change_percentage_24h}</p>
                                    </div>
                                    <div className="horizontal-line"></div>




                                    <div className="reveal-from-right display-flex-betwn">
                                        <p className="text-sm gray-text">Max Supply</p>
                                        <p className="text-sm bold-num color-black">{mainCoinData?.market_data.max_supply}</p>
                                    </div>
                                    <div className="horizontal-line"></div>

                                    <div className="reveal-from-right display-flex-betwn">
                                        <p className="text-sm gray-text">All-Time High</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.ath.inr}</p>
                                    </div>
                                    <div className="horizontal-line"></div>

                                    <div className="reveal-from-right display-flex-betwn">
                                        <p className="text-sm gray-text">All-Time Low</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.atl.inr}</p>
                                    </div>
                                    <div className="horizontal-line"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="Sentiments" className="sentiment-cont">
                        <h1 className="title color-black align-left-text">Sentiment</h1>
                        <div className="title color-black align-left-text title-med gray-text">
                            Key Events <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709646666/koinx/SVG_margin_efccv1.png" alt="" />
                        </div>

                        <div className="cards-list ">
                            <Slider {...settings}>

                                <div className="card">
                                    <div className="sentiment-card faint-blue-back">
                                        <div className="icon-div">
                                            <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709701483/koinx/Frame_1116601921_robbdh.png" alt="" />
                                        </div>
                                        <div className="content-div">
                                            <p className="text-lg align-left-text">
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati fuga sed inventore!
                                            </p>
                                            <p className="text-sm gray-text align-left-text">
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi delectus hic amet voluptas officia obcaecati adipisci tempore eos officiis eum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta eaque commodi nostrum!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="sentiment-card faint-green-back">
                                        <div className="icon-div">
                                            <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709701483/koinx/Frame_1116601921_robbdh.png" alt="" />
                                        </div>
                                        <div className="content-div">
                                            <p className="text-lg align-left-text">
                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati fuga sed inventore!
                                            </p>
                                            <p className="text-sm gray-text align-left-text">
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi delectus hic amet voluptas officia obcaecati adipisci tempore eos officiis eum? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta eaque commodi nostrum!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>

                        <div className="analyst-estimates-cont">
                            <div className="title color-black align-left-text title-med gray-text">
                                Analyst Estimates<img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709646666/koinx/SVG_margin_efccv1.png" alt="" />
                            </div>
                            <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709707773/koinx/div.exr42mainDiv_elufqb.png" alt="" className="analyst-big-display pie-img" />
                            <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709708059/koinx/Group_27608_ctwryd.png" alt="" className="analyst-small-display pie-img" />
                        </div>

                        <div className="sub-fundamentals-cont fundamentals-display-none">
                            <div className="title color-black align-left-text title-med gray-text mg-up-2rem">
                                Fundamentals <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709646666/koinx/SVG_margin_efccv1.png" alt="" />
                            </div>

                            <div className="mega-fundamental-cont display-flex-betwn">
                                <div className="fundamental-columns">
                                <div className="reveal-from-right display-flex-betwn">
                                        <p className="text-sm gray-text">All-Time High</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.ath.inr}</p>
                                    </div>
                                    <div className="horizontal-line"></div>

                                    <div className="reveal-from-right display-flex-betwn">
                                        <p className="text-sm gray-text">All-Time Low</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.atl.inr}</p>
                                    </div>
                                    <div className="horizontal-line"></div>
                                   
                                </div>

                                <div className="fundamental-columns">
                                <div className="horizontal-line"></div>
                                    <div className="reveal-from-right display-flex-betwn">
                                        <p className="text-sm gray-text">Total Volume</p>
                                        <p className="text-sm bold-num color-black">&#8377;{mainCoinData?.market_data.total_volume.inr}/</p>
                                    </div>
                                    <div className="horizontal-line"></div>

                                    <div className="reveal-from-right display-flex-betwn">
                                        <p className="text-sm gray-text">Market Cap Rank</p>
                                        <p className="text-sm bold-num color-black">{mainCoinData?.market_data.market_cap_rank}</p>
                                    </div>
                                    <div className="horizontal-line"></div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="reveal-from-right about-bitcoin-container container">
                        <h1 className="title color-black align-left-text">About {mainCoinData?.name}</h1>
                        <div className="reveal-from-right title color-black align-left-text title-med color-black">
                            What is {mainCoinData?.name} ?
                        </div>
                        <p className="reveal-from-right text-sm gray-text align-left-text">
                           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio et expedita, sequi qui impedit sint natus quia corporis libero omnis? Temporibus autem labore itaque exercitationem, maiores tempora? Mollitia quam esse voluptatum culpa.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos ad tenetur animi nam delectus beatae laudantium reiciendis, debitis, asperiores doloribus fugiat iste? Cumque repudiandae facilis inventore dignissimos nostrum ullam, asperiores exercitationem illum.
                        </p>
                        <div className="horizontal-line"></div>

                        <div className="title color-black align-left-text title-med color-black mg-up-1rem">
                            Lorem ipsum
                        </div>
                        <p className="text-sm gray-text align-left-text">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, inventore. Aspernatur excepturi unde dolores nesciunt nisi porro nostrum illo eos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam alias modi quam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, expedita doloribus. Consequuntur?
                        </p>
                        <p className="text-sm gray-text align-left-text">
                            Diam praesent massa dapibus magna aliquam a dictumst volutpat. Egestas vitae pellentesque auctor amet. Nunc sagittis libero adipiscing cursus felis pellentesque interdum. Odio cursus phasellus velit in senectus enim dui. Turpis tristique placerat interdum sed volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris faucibus diam mi nunc praesent massa turpis a. Integer dignissim augue viverra nulla et quis lobortis phasellus. Integer pellentesque enim convallis ultricies at.
                        </p>
                        <p className="text-sm gray-text align-left-text">
                            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui
                        </p>

                        <div className="horizonatal-line"></div>

                        <div className="already-holding-bitcoin-container mg-up-1rem">
                            <h1 className="title color-black align-left-text">Already Holding {mainCoinData?.name}?</h1>

                            <div className="calculate-cards-list">
                                <div className="reveal-from-left calculate-card blue-back-gradient">
                                    <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709710094/koinx/Rectangle_11947_sowesn.png" alt="" />
                                    <div className="content-and-button-div">
                                        <p className="title no-margin">Calculate Your Profits</p>
                                        <button className="standard-btn">Check Now</button>
                                    </div>
                                </div>

                                <div className="reveal-from-right calculate-card red-back-gradient">
                                    <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709710094/koinx/Rectangle_11947_sowesn.png" alt="" />
                                    <div className="content-and-button-div">
                                        <p className="title no-margin">Calculate Your Tax Liability</p>
                                        <button className="standard-btn">Check Now</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="horizontal-line mg-up-1rem"></div>

                        <p className="text-sm gray-text align-left-text mg-up-1rem">
                            Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui
                        </p>

                    </div>



                    <div id="Tokenomics" className="tokenomics-container container analyst-big-display">
                        <h1 className="title color-black align-left-text">Tokenomics</h1>
                        <div className="title color-black align-left-text title-med color-black">
                            Initial Distribution
                        </div>
                        <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709724483/koinx/div.tokenomics-wrapper_opqraq.png" alt="" />
                        <p className="text-sm gray-text align-left-text mg-up-1rem">
                            Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.
                        </p>
                    </div>

                    <div id="Team" className="teams-container container">
                        <h1 className="title color-black align-left-text">Team</h1>
                        <p className="text-sm gray-text align-left-text mg-up-1rem">
                            Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.
                        </p>

                        <div className="reveal-from-right team-card">
                            <div className="team-member-photo-and-role">
                                <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709731796/koinx/sandeep_d45q0v.png" alt="" />
                                <p className="role title-med color-black no-margin mg-up-1rem">John Smith</p>
                                <p className="text-sm gray-text no-margin">Designation here</p>
                            </div>
                            <div className="team-content text-sm  gray-text align-left-text">
                                Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu
                            </div>
                        </div>

                        <div className="reveal-from-right team-card">
                            <div className="team-member-photo-and-role">
                                <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709731796/koinx/sandeep_1_cygcch.png" alt="" />
                                <p className="role title-med color-black no-margin mg-up-1rem">John Smith</p>
                                <p className="text-sm gray-text no-margin">Designation here</p>
                            </div>
                            <div className="team-content text-sm  gray-text align-left-text">
                                Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu
                            </div>
                        </div>

                        <div className="reveal-from-right team-card">
                            <div className="team-member-photo-and-role">
                                <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709731795/koinx/sandeep_2_dzxm3h.png" alt="" />
                                <p className="role title-med color-black no-margin mg-up-1rem">John Smith</p>
                                <p className="text-sm gray-text no-margin">Designation here</p>
                            </div>
                            <div className="team-content text-sm  gray-text align-left-text">
                                Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu
                            </div>
                        </div>

                    </div>


                    <div className="sparkline-charts-container container">
                        <h1 className="title color-black align-left-text">You May Also Like</h1>

                        <Slider {...settingsForSparklineCharts}>
                            {coins.map((chart) => (
                                <div>
                                    <div className="chart-card">
                                        <div className="list no-space-betwn">
                                            <div className="trending-list-small-flex mg-rt-0_5rem">
                                                <img src={chart.item.thumb} alt="" className="sm-logo-coin" />
                                                <p className="title-coin">{chart.item.name}</p>
                                            </div>

                                            <div className={`${chart.item.data.price_change_percentage_24h.inr.toFixed(2) > 0 ? 'up-percent-cont ' : 'up-percent-cont down-percent'}`}>{chart.item.data.price_change_percentage_24h.inr.toFixed(2)}</div>
                                        </div>
                                        <p className="text-sm color-black">
                                            {chart.item.data.price}
                                        </p>
                                        <img src={chart.item.data.sparkline} alt="" />
                                    </div>
                                </div>
                            ))}
                        </Slider>

                        <Slider {...settingsForSparklineCharts}>
                            {coins.map((chart) => (
                                <div>
                                    <div className="chart-card">
                                        <div className="list no-space-betwn">
                                            <div className="trending-list-small-flex mg-rt-0_5rem">
                                                <img src={chart.item.thumb} alt="" className="sm-logo-coin" />
                                                <p className="title-coin">{chart.item.name}</p>
                                            </div>

                                            <div className={`${chart.item.data.price_change_percentage_24h.inr.toFixed(2) > 0 ? 'up-percent-cont ' : 'up-percent-cont down-percent'}`}>{chart.item.data.price_change_percentage_24h.inr.toFixed(2)}</div>
                                        </div>
                                        <p className="text-sm color-black">
                                            {chart.item.data.price}
                                        </p>
                                        <img src={chart.item.data.sparkline} alt="" />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>


                </div>




                <div className="col-2">
                    <div className="get-started-card">
                        <p className="title">
                            Get Started with KoinX for FREE
                        </p>
                        <p className="text-sm">
                            With our range of features that you can equip for free, KoinX allows you to be more educated and
                            aware of your Tax Reports
                        </p>
                        <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709639378/koinx/Frame_i8yjrv.png" alt="" className="get-started-img" />
                        <button className="get-started-btn standard-btn">
                            Get Started
                        </button>
                    </div>




                    <div className="trending-cont">
                        <p className="title color-black align-left-text">Trending (24h)</p>
                        <div className="trending-list">
                            {coins.slice(0, 3).map((coin) => (
                                <div className="list">
                                    <div className="reveal-from-right trending-list-small-flex">
                                        <img src={coin.item.thumb} alt="" className="sm-logo-coin" />
                                        <p className="title-coin">{coin.item.name}</p>
                                    </div>

                                    <div className={`${coin.item.data.price_change_percentage_24h.inr.toFixed(2) > 0 ? 'up-percent-cont ' : 'up-percent-cont down-percent'}`}>{coin.item.data.price_change_percentage_24h.inr.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>

        </div>

    </>
}
const NextArrow = (props) => {
    const { onClick } = props;
    return <>
        <div className="nxt" onClick={onClick}>
            <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709705296/koinx/Button_tkqkr2.png" alt="" />
        </div>
    </>
}
const PrevArrow = (props) => {
    const { onClick } = props;
    return <>
        <div className=" prev" onClick={onClick}>
            <img src="https://res.cloudinary.com/dn07sxmaf/image/upload/v1709705296/koinx/Button_tkqkr2.png" alt="" />
        </div>
    </>
}
export default Home;