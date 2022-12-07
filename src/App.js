import { useState, useEffect, Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { 
	Flex,
	Button,
	Image,
	Text,
	ChakraProvider,
	Spinner,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react";
import "./App.scss";
import "./mdi/css/materialdesignicons.css";
import Aos from "aos";
import "aos/dist/aos.css";
import img1 from "./img1.png";
import img2 from "./img2.png";
import founder1 from "./unfunk.webp";
import founder2 from "./horst.webp";
import founder3 from "./luna.webp";
import founder4 from "./uv.webp";
import founder5 from "./fede.webp";
import founder3small from "./founder3small.png";
// import Banner from "./header.jpeg";
import Banner from "./Banner.jpg";
import Ticket from "./ticket.png";
import Graphic from "./horst_graphics.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import icon from "./icon_pitch.png";
import pitch_icon from "./pitch_soccer_logo.png"
import discord_icon from "./discord_button.png"
import twitter_icon from "./twitter_button.png"
import pitch_soccer from "./pitch_soccer.png"
import roadmap_tile from "./roadmap_tile.jpeg"
const TWITTER_LINK = "https://twitter.com/pitchweb3";
const INSTAGRAM_LINK = "https://www.instagram.com/pitch.nft/";
const DISCORD_LINK = "https://discord.gg/EVfKShm6"
const offBlack = "#251811"
const offBlue = "rgb(95, 159, 255)"
const sectionHeaderFontSize = ["24px", "36px"]
const headerBigFS = ["4vh", "6vh"];
const roadmapBulletsFS = ["14px", "16px"]
const cardFS = ["1.7vh","2.2vh"]
const qCardWidth  = ["80vw", "25vw"]
const qCardHeight = ["16vh", "18vh"]
const teamImageWidth = ["85px", "200px"]
const teamImageHeight = teamImageWidth;
const teamTitlesFS = ["16px", "30px"]
const roadmapCardWidth = ["90%", "40%"]

const visionHeader = [{
	fontFamily: "PoppinsExtraBold",
	lineHeight: "100%",
	fontSize: "24px",
	marginTop: "3%",
	marginBottom: "3%"
  },
  {
  fontFamily: "PoppinsExtraBold",
	lineHeight: "100%",
	fontSize: "36px",
	marginTop: "3%",
	marginBottom: "3%"
  }
]
const visionText = {
	fontFamily: "PoppinsMedium",
	lineHeight: "110%",
	fontSize: "2.2vh",
	marginBottom: "10%"
  }  


// IMAGE ASSETS
// img1.png, img2.png are the guys that show up during the initial animation / bounce up and down
// icon.png is in the upper left part of the screen

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


function App() {
	const [isConnected, setIsConnected] = useState(false)
	const [correctNetwork, setCorrectNetwork] = useState(false)
	const [isMintActive, setIsMintActive] = useState(0)
	const [isPublicMintActive, setIsPublicMintActive] = useState(false)
	const [isPreMintActive, setIsPreMintActive] = useState(false)
	const [userAddress, setUserAddress] = useState("")
	const [loading, setLoading] = useState(false)
	const [funcRes, setFuncRes] = useState("")
	const [funcRes2, setFuncRes2] = useState("")
	const [funcTrue, setFuncTrue] = useState(false)
	const [mintAmount, setMintAmount] = useState(1)
	const [maxMintAmount, setMaxMintAmount] = useState(0)
	const [isCheckingMintState, setIsCheckingMintState] = useState(false)
	const [timesCheckedMintState, setTimesCheckedMintState] = useState(0)
	const [appShow, setAppShow] = useState(true)
	const [appShowImg, setAppShowImg] = useState(false)
	const { height, width } = useWindowDimensions();

	let joinDiscordWidth="1%"

	useEffect(() => {
		Aos.init({ duration: 1500 });
		setTimeout(function() {
			setAppShowImg(true)
		}, 500)
		setTimeout(function() {
			setAppShow(true)
		}, 2000)
	}, []);

	// const pitchMaps = [ "World Cup excitement! Discord action centered around the tournament.", 
	// 				"Banter, memes and frequent contests with amazing prizes.", 
	// 				"Pitch will cover the tab of your group's watch party (2 each week)", 
	// 				"Preview of artwork for 1st NFT collection; utility and mint details released." 
	// 				]
	const pitchMaps = [
		"World Cup excitement, banter and community events with frequent prizes given!",
		"Football trivia and game prediction leaderboard",
		"Meme contests and fan art contests",
		"FIFA 23 gaming tournament",
		"Twitter Space co-hosted by professional commentator during WC games",
		"Discord coin economy redeemable in merch store",
		"Prize pool of 20+ items including signed gear by star players",
		"Pitch will organize and cover the tab of your group’s watch party (2 each week)"
	]

// 	const pitchMaps2 = [ "1st mini NFT collection launched Dec 15. Basic benefits include access to grand prizes for WC final; airdrops and access to project collaborations; allow-list spot for Pitch's main PFP collection launch in mid-January.", 
// 	"Organized and sponsored watch parties for later rounds of World Cup.", 
// 	"Creation of and initial setup of Pitch DAO.", 
// ]
	const pitchMaps2 = [
		"Ethereum Mainnet ERC-1155 tokens",
		"Supply of 640 tokens",
		"Mint price of 0.02 ETH"
	]

// 	const pitchMaps3 = [ "January: main launch of main PFP generative NFT collection.", 
// 	"Exclusive IRL community events and meetups, focused on EPL and Champions League.",
// 	"Finalize DAO governance and funding strategy.",
// 	"Announce partnerships with football teams, players and local community organizations.",
// 	"Define scope of digital platform for members and start building prototype app."
//  ]
	const pitchMaps3 = [
		"Entry to WC final giveaway on Dec 18th with top-tier grand prizes",
		"Access to exclusive Pitch-sponsored events",
		"Membership in Pitch DAO, funded with 20% of token proceeds",
		"Allow-list spots for other high quality project mints",
		"Football betting alpha and alerts given by professionals",
		"Allow-list spot reserved for Pitch’s main PFP collection in January 2023"
	]

	const pitchMaps4 = [
		"PFP generative art NFT collection launched in January 2023",
		"Exclusive IRL community events focused on EPL and Champions League",
		"Finalize DAO governance and funding priorities",
		"Land partnerships with football teams, players and local organizations",
		"Define scope of digital platform for members and start building prototype apps"
	]

	const pitchDrive = [ 
		"We are a new startup with a mission to create a community devoted to the future of the beautiful game in web3.",
		"Pitch is a community to have a kickass time and meet fellow fans.",
		"We'll reward members with killer prizes and digitial collectibles.",
		"Ultimately, our vision of Pitch is a platform which spans our digital and physical worlds, including mobile-first applications at the center of the Football Web3 space."
]

	const pitchQs = [
		"1. What is Pitch? ANSWER Pitch is a new web3 startup devoted to the global football community.  We are a place to have a kickass time and meet fellow fans.  We’ll reward members with killer prizes and digital collectibles.  Ultimately, Pitch will be a platform which spans our digital and physical worlds, including mobile-first applications at the center of the Football Web3 space.",
		"2. Who is Pitch? ANSWER See Team section on our website here.",
		"3. Can I be part of Pitch without owning anything? ANSWER Yes! We celebrate the love for football and you can always come over for a chat and banter with us!  Many of our giveaways in the first stage will be open to all.",
		"4. Where is the list of prizes? ANSWER Full list announced soon.  Examples include a signed Ronaldo jersey, signed Messi ball, premium game tickets, plus straight cash and ETH!",
		"5. What will the first Pitch NFT collection include? ANSWER Our first NFT collection will be a limited edition for our OG members which will include special perks, exclusive giveaways and priority in subsequent collection mint.",
		"6. When is the mint? ANSWER December 16th",
		"7. What’s the supply? ANSWER 640 tokens",
		"8. How much is mint? ANSWER 0.02 eth",
		"9. Which blockchain will the NFT mint be on? ANSWER All tokens will mint on Ethereum network.",
		"10. Will there be allow lists? ANSWER Yes! Stay tuned for more updates; get an advantage by staying active, helping your fellow members and growing our community. The team is watching and will certainly award any enthusiastic members."
	]

	return (
		<ChakraProvider>
			<Flex direction="column" w="100vw" height="60vh" className='greenPitchBkg'>
				<Flex className='pitchNavbar' justify="space-between">
					<Image src={pitch_icon} className="pitchNavbarLogo" h="80%"/>
					<Flex>
						<a>
							<Image src={discord_icon} className="pitchDiscordIcon" onClick={() => window.open("https://discord.gg/EVfKShm6", "_BLANK")} />
						</a>
						<a style={{margin:0, padding:0, cursor:"pointer"}}>
							<Image src={twitter_icon} className="pitchTwitterIcon" onClick={() => window.open("https://twitter.com/pitchweb3", "_BLANK")} />
						</a>
					</Flex>
				</Flex>
				<Flex direction={"column"} marginLeft={["10%", "25%"]} marginTop={["10%", "5vh"]}>
					<Text marginTop fontSize={headerBigFS} className="headerText headerBig">Football</Text>
					<Text fontSize={headerBigFS} className="headerText headerBig">Community</Text>
					<Text fontSize={headerBigFS} className="headerText headerBig">NFTs</Text>
					<Text className="headerText headerSml" marginTop={["12%", "4vh"]}>A new project</Text>
					<Text className="headerText headerSml">all about futbol for</Text>
					<Text className="headerText headerSml" marginBottom={["12","2%"]}>the degen community.</Text>
					<div>
						<button className="headerDiscordButton">Join Discord</button>
					</div>
				</Flex>
			</Flex>
			<Flex w="100vw" height={["80vh","50vh"]} className='whiteSquareBkg'>
				<Flex w="70vw" margin={[["7.5vw 15vw"], ["2vw 15vw"]]} direction="column">
					<Flex direction={["column","row"]}>

						<Flex className="qCard" direction="column" width={qCardWidth} height={qCardHeight} marginRight={["0", "3%"]} marginBottom="3%">
							<Flex direction="row" justify="space-between" className="qCardTop">
								<Flex className="qCardYellow qCardXFlex"><Text className='qCardX'>x</Text></Flex>
								<a href={DISCORD_LINK} className="qCardYellow qCardButton">Banter here &gt;&gt;&gt;</a>
							</Flex>
							<Text fontSize={cardFS} className="qCardText qCardTextTop">Are you a football nut</Text>
							<Text fontSize={cardFS} className="qCardText">and want to show off</Text>
							<Text fontSize={cardFS} className="qCardText qCardBottom">your banter skills?</Text>
						</Flex>
						<Flex className="qCard" direction="column" width={qCardWidth} height={qCardHeight} marginBottom="3%">
							<Flex direction="row" justify="space-between" className="qCardTop">
								<Flex className="qCardOrange qCardXFlex"><Text className='qCardX'>x</Text></Flex>
								<a href={DISCORD_LINK} className="qCardOrange qCardButton">Celebrate here &gt;&gt;&gt;</a>
							</Flex>
							<Text fontSize={cardFS} className="qCardText qCardTextTop">Celebrate the glory of</Text>
							<Text fontSize={cardFS} className="qCardText">your team! Shame the players</Text>
							<Text fontSize={cardFS} className="qCardText qCardBottom">flopping to get a foul call!</Text>
						</Flex>
					</Flex>
					<Flex direction={["column","row"]} marginBottom={["3%",0]}>
						<Flex className="qCard" direction="column" width={qCardWidth} height={qCardHeight} marginRight={["0", "3%"]} marginBottom={["3%", "0"]}>
							<Flex direction="row" justify="space-between" className="qCardTop">
								<Flex className="qCardAqua qCardXFlex"><Text className='qCardX'>x</Text></Flex>
								<a href={DISCORD_LINK} className="qCardAqua qCardButton">Play here &gt;&gt;&gt;</a>
							</Flex>
							<Text fontSize={cardFS} className="qCardText qCardTextTop">Play trivia and</Text>
							<Text fontSize={cardFS} className="qCardText">win autographed jerseys</Text>
							<Text fontSize={cardFS} className="qCardText qCardBottom">from star players!</Text>
						</Flex>
						<Flex className="qCard" direction="column" width={qCardWidth} height={qCardHeight} marginBottom={["3%",0]}>
							<Flex direction="row" justify="space-between" className="qCardTop">
								<Flex className="qCardBlue qCardXFlex"><Text className='qCardX'>x</Text></Flex>
								<a href={DISCORD_LINK} className="qCardBlue qCardButton">Enter here &gt;&gt;&gt;</a>
							</Flex>
							<Text fontSize={cardFS} className="qCardText qCardTextTop">Enter a meme contest</Text>
							<Text fontSize={cardFS} className="qCardText">and win VIP</Text>
							<Text fontSize={cardFS} className="qCardText qCardBottom">match tickets!</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>

			<Flex direction="column" w="100vw" height="100vh" className='visionBkg'>
				<Flex direction="column" justify="flex-end" w={["80vw", "40vw"]} height="100vh" className="visionImage" marginLeft={["10vw","30vw"]}>
					<Flex className="pitchSoccerVisonImage" w="100px" height="100px"/>
					<Text className="visionHeader" fontSize={sectionHeaderFontSize}>What is Pitch?</Text>
					<Text className="visionText">Pitch is a new startup with a mission to create a community devoted to the future of the beautiful game in web3. It’s a place to have a kickass time and meet fellow fans. Pitch is for fans who love to banter, trivia nuts, gamers, memelords, and any footballer who enjoys a laugh.  Members will be rewarded with killer prizes and NFTs, with access to premium content and exclusive events.</Text>
				</Flex>
			</Flex>

			<Flex minHeight="100vh" w="100%" direction="column" backgroundImage={roadmap_tile} color="#fff" fontFamily="chalk" px={["4%", "6%"]} pt={["4%", "2.8%"]} pb={["8%", "2.8%"]}>
				
				<Text className="RoadMapHeaderText" fontSize={sectionHeaderFontSize}>Roadmap</Text>
				<Text id="rdMap" visibility="hidden"></Text>
				<Flex w="100%" overflow="hidden" mt={["4", "0"]}>
					<Flex w={roadmapCardWidth} direction="column" data-aos="fade-right" bg="white" borderRadius="8px" borderColor="black" borderWidth="3px" boxShadow="8px 8px 0px black" mb="8px">
						<Text fontSize={["15px", "17px"]} color={offBlack}>
							<Text fontWeight="bold" ml={["6", "12"]} fontSize={["20px", "30px" ]} color={offBlue} fontFamily="PoppinsExtraBold">Now</Text>
							<Flex direction="column" ml={["6", "12"]} w="100%" data-aos="fade-up">
							<ul>
								{
									pitchMaps.map((item, index) => (
										<Flex key={index} w="80%" justify="space-between">
											<li>
												<Text w="100%" mt={["0", "3"]} fontSize={roadmapBulletsFS} fontFamily="PoppinsMedium">{item}</Text>
											</li>
										</Flex>
									))
								}
							</ul>
							</Flex>
						</Text>
					</Flex>
					{/* <Flex w={["10%", "30%"]} mt="100px" borderTop={["8px solid white", "15px solid white"]} borderRight={["8px solid white", "15px solid white"]} borderTopRightRadius="15px" outline="black solid 3px" ></Flex> */}
				</Flex>


				<Flex w="100%" mt={["6", "12"]} overflow="hidden" color={offBlack}>	
					{/* <Flex w={["10%", "30%"]} mt="100px" borderTop={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderLeft={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderTopLeftRadius="15px"></Flex> */}
					<Flex ml="20%" w={roadmapCardWidth} direction="column" data-aos="fade-left" bg="white" borderRadius="8px" borderColor="black" borderWidth="3px" boxShadow="8px 8px 0px black" mb="8px">
						<Text fontSize={["15px", "17px"]}>

						<Text fontWeight="bold" ml={["6", "12"]} fontSize={["20px", "30px" ]} color={offBlue} fontFamily="PoppinsExtraBold">Soon</Text>
							<Flex direction="column"ml={["6", "12"]} w="100%" data-aos="fade-up">
								<Text fontWeight="bold" fontSize={["18px", "22px" ]} mb="2" mr="20" color={offBlack} fontFamily="PoppinsMedium">1st preliminary NFT collection launched Friday Dec 16th 2022:</Text>
								
								<ul>
								{
									pitchMaps2.map((item, index) => (
										<Flex key={index} w="80%" justify="space-between">
											<li>
												<Text w="100%" mt={["0", "3"]} fontSize={roadmapBulletsFS} fontFamily="PoppinsMedium">{item}</Text>
											</li>
										</Flex>
									))
								}
							</ul>
							</Flex>
							<Flex direction="column" ml={["6", "12"]} w="100%" data-aos="fade-up" mt="6">
								<Text fontWeight="bold" fontSize={["18px", "22px" ]} mb="2" mr="20" color={offBlack} fontFamily="PoppinsMedium">Holder benefits include:</Text>
									<ul>
									{
										pitchMaps3.map((item, index) => (
											<Flex key={index} w="80%" justify="space-between">
												<li>
													<Text w="100%" mt={["0", "3"]} fontSize={roadmapBulletsFS} fontFamily="PoppinsMedium">{item}</Text>
												</li>
											</Flex>
										))
									}
								</ul>
							</Flex>
						</Text>
					</Flex>
				</Flex>

				<Flex w="100%" overflow="hidden" mt={["6", "12"]}>
					<Flex w={roadmapCardWidth} direction="column" data-aos="fade-right" bg="white" borderRadius="8px" borderColor="black" borderWidth="3px" boxShadow="8px 8px 0px black" mb="8px">
						<Text fontSize={["15px", "17px"]} color={offBlack}>
							<Text fontWeight="bold" ml={["6", "12"]} fontSize={["20px", "30px" ]} color={offBlue} fontFamily="PoppinsExtraBold">Future</Text>
							<Flex direction="column" ml={["6", "12"]} w="100%" data-aos="fade-up">
							<ul>
								{
									pitchMaps4.map((item, index) => (
										<Flex key={index} w="80%" justify="space-between">
											<li>
												<Text w="100%" mt={["0", "3"]} fontSize={roadmapBulletsFS} fontFamily="PoppinsMedium">{item}</Text>
											</li>
										</Flex>
									))
								}
							</ul>
							</Flex>
						</Text>
					</Flex>
				</Flex>

				<Flex justify="center" mt={["6", "12"]} backgroundColor="white" borderRadius="8px" borderColor="black" borderWidth="3px" boxShadow="8px 8px 0px black" py="12" color={offBlack} fontFamily="PoppinsMedium">
					<Flex w="100%" direction="column" align="center">
						<Text fontWeight="bold" fontSize={sectionHeaderFontSize} color={offBlue} fontFamily="PoppinsExtraBold">
							The Team
						</Text>
						<Flex w="100%" justify="center" px="10%" direction={["column", "row"]}>
							<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
								<Text fontWeight="bold" fontSize={teamTitlesFS} mt={["2", "4"]} mb="2" data-aos="fade-up">
									Founder
								</Text>
								<Image w={teamImageWidth} h={teamImageHeight} borderRadius="100%" src={founder1} mt="6" mb="4" data-aos="fade-up" />
								
								<Accordion allowToggle>
									<AccordionItem>
											<AccordionButton>
												<Flex flex='1' textAlign='left' fontSize={["17px", "24px"]}>
													<Text  cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/UnFunkableToken", "_BLANK")}>@UnFunkableToken</Text>
												</Flex>
												<AccordionIcon />
											</AccordionButton>
											<AccordionPanel pb={4}>
												<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
													A data scientist turned entrepreneur with experience across tech, finance, and philanthropy.  Pursuing web3 ventures full-time after leaving a senior management role at Facebook earlier this year.  A lifelong player, fan and coach…go Pulisic and Team USA
												</Text>
											</AccordionPanel>
										</AccordionItem>
								</Accordion>

								
							</Flex>

							<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
								<Text fontWeight="bold" fontSize={teamTitlesFS} mt={["2", "4"]} mb="2" data-aos="fade-up">
									Artist
								</Text>
								<Image w={teamImageWidth} h={teamImageHeight} borderRadius="100%" src={founder2} mt="6" mb="4" data-aos="fade-up" />

								<Accordion allowToggle>
									<AccordionItem>
											<AccordionButton>
												<Flex flex='1' textAlign='left' fontSize={["17px", "24px"]}>
													<Text  cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/HorstVonMueller", "_BLANK")}>@HorstVonMueller</Text>
												</Flex>
												<AccordionIcon />
											</AccordionButton>
											<AccordionPanel pb={4}>
												<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
													Creative industry professional with 25+ years experience, working with Mercedes, Porsche, Samsung, and the like. Only to find out that it feels much better to do art at the root of something new and take part in a developing revolution of the creative industry. 
												</Text>
											</AccordionPanel>
										</AccordionItem>
								</Accordion>
							</Flex>
						</Flex>

						<Flex w="100%" justify="center" px="10%" direction={["column", "row"]}>
							<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
								<Text fontWeight="bold" fontSize={teamTitlesFS} mt={["12", "100px"]} mb="2" data-aos="fade-up">
									Developer
								</Text>
								<Image w={teamImageWidth} h={teamImageHeight} borderRadius="100%" src={founder3} mt="6" mb="4" data-aos="fade-up" />

								<Accordion allowToggle>
									<AccordionItem>
										<AccordionButton>
											<Flex flex='1' textAlign='left' fontSize={["17px", "24px"]}>
												<Text  cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/TheLunaLabs", "_BLANK")}>@TheLunaLabs</Text>
											</Flex>
											<AccordionIcon />
										</AccordionButton>
										<AccordionPanel pb={4}>
											<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
												Luna studies how galaxies form their stars by performing numerical simulations with some of the largest supercomputers yet known to mankind and loves living on the cutting-edge of our evolvingly technocratic society. Luna has developed dozens of discord bots, smart contracts, and minting dapps and enjoys the breathtaking speed of digital evolution known as web3. Luna is a fan of Sadio Mané and Bayern München.
											</Text>
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
							</Flex>

							<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
								<Text fontWeight="bold" fontSize={teamTitlesFS} mt={["12", "100px"]} mb="2" data-aos="fade-up">
									Marketing/Community/Strategy
								</Text>
								<Image w={teamImageWidth} h={teamImageHeight} borderRadius="100%" src={founder4} mt="6" mb="4" data-aos="fade-up" />
								
								<Accordion allowToggle>
									<AccordionItem>
										<AccordionButton>
											<Flex flex='1' textAlign='left' fontSize={["17px", "24px"]}>
												<Text  cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/uav1869", "_BLANK")}>@uav1869</Text>
											</Flex>
											<AccordionIcon />
										</AccordionButton>
										<AccordionPanel pb={4}>
											<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" mb="4" data-aos="fade-up">
												E-commerce wiz with over 10 years of experience. Now consulting startup’s across all industries. Web3 enthusiast committed to creating one degen at a time. Dead ball specialist. 
											</Text>
										</AccordionPanel>
									</AccordionItem>
								</Accordion>

							</Flex>
						</Flex>

						<Flex align="center" w={["100%","200%"]} px="10%" direction={["column", "row"]} justify="center">

							<Flex w={["100%", "50%"]} direction="column" align="center">
								<Text fontWeight="bold" fontSize={teamTitlesFS} mt={["12", "100px"]} mb="2" data-aos="fade-up">
									Community/Moderation
								</Text>

								<Flex w="100%" align="center" justify="center" px="0%" direction={["column", "row"]}>
									<Flex direction="column" align="center" w={["100%", "50%"]}>
										<Image w={teamImageWidth} h={teamImageHeight} borderRadius="100%" src={founder5} mt="6" mb="4" data-aos="fade-up" />

										<Accordion allowToggle>
											<AccordionItem>
												<AccordionButton>
													<Flex flex='1' textAlign='left' fontSize={["17px", "24px"]}>
														<Text  cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/fede_rr_", "_BLANK")}>@fede_rr_</Text>
													</Flex>
													<AccordionIcon />
												</AccordionButton>
												<AccordionPanel pb={4}>
													<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" mb="4" data-aos="fade-up">
														IP lawyer who fell in love with Web3 and NFTs: fascinated by the new routes Web3 is opening in terms of management and exploitation of IP rights.  Been in this space since 2021, moderating and building communities.  Petrolhead with a green heart, I spend most of my free time in the mountains, either with my bicycle or my motorbike.  Professional cat petter and wine lover.
														”There’s only one Ronaldo, and his name is not Cristiano”.
													</Text>
												</AccordionPanel>
											</AccordionItem>
										</Accordion>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>

			<Flex minHeight="100vh" w="100%" direction="column" bg="#1D8E65" color="white" fontFamily="PoppinsMedium" px={["4%", "6%"]} pt={["4%", "2.8%"]} pb={["8%", "2.8%"]}>
				<Flex w="100%" mt={["6", "12"]} data-aos="fade-up" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6" direction="column" align="center">
					<Flex align="flex-start" direction={["column", "row"]}>
						<Text>
							<Text fontWeight="bold" fontSize={sectionHeaderFontSize} fontFamily="PoppinsExtraBold">
								FAQ
							</Text>

							<Text mb="4" fontSize={["17px", "24px"]} mr={["0","40"]}>
							This page will be continually updated so check back for unanswered questions!
							</Text>

							<Accordion allowToggle>
								{
									pitchQs.map((item, index) => (
										<AccordionItem>
											<AccordionButton>
												<Flex flex='1' textAlign='left' mb="4" fontSize={["17px", "24px"]}>
													{item.split(" ANSWER ")[0]}
												</Flex>
												<AccordionIcon />
											</AccordionButton>
											<AccordionPanel pb={4}>
												<Text mb="4" fontSize={["17px", "24px"]}>
													{item.split(" ANSWER ")[1]}
												</Text>
											</AccordionPanel>
										</AccordionItem>
									))
								}

							</Accordion>
						</Text>
					</Flex>
				</Flex>
					
				<Flex direction="column" mt={["6", "12"]} bgColor="rgba(255,255,255,0.03)" borderRadius="8px" py="12" px={["6", "0"]}>
					<Text align="center">
						Copyright © 2022 Pitch Web3. All rights reserved.
					</Text>
					<Flex flex="1" align="center" justify="center" mt="8"  data-aos="fade-up">
						<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]} align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.1)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.3)"}} cursor="pointer" className="bounce" mr={["3", "5" ]} onClick={() => window.open("https://twitter.com/pitchweb3", "_BLANK")}><i className="mdi mdi-twitter"></i></Flex>
						<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]}  align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.1)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.3)"}} className="bounce" mr={["3", "5" ]} cursor="pointer" onClick={() => window.open("https://discord.gg/EVfKShm6", "_BLANK")}><i className="mdi mdi-discord"></i></Flex>
						<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]}  align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.1)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.3)"}} className="bounce2" onClick={() => window.open("https://www.instagram.com/pitch.nft/", "_BLANK")} cursor="pointer"><i className="mdi mdi-instagram"></i></Flex>
					</Flex>
				</Flex>
			</Flex>
		</ChakraProvider>
	)
}

export default App;
