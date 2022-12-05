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
import show1 from "./show1.png";
import show2 from "./show2.png";
import show3 from "./show3.png";
import show4 from "./show4.png";
import show5 from "./show5.png";
import show6 from "./show6.png";
import show7 from "./show7.png";
import show8 from "./show8.png";
import show9 from "./show9.png";
import show10 from "./show10.png";
import show11 from "./show11.png";
import show12 from "./show12.png";
import show13 from "./show13.png";
import show14 from "./show14.png";
import show15 from "./show15.png";
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
const TWITTER_LINK = "https://twitter.com/pitchweb3";
const INSTAGRAM_LINK = "https://www.instagram.com/pitch.nft/";
const DISCORD_LINK = "https://discord.gg/EVfKShm6"

// IMAGE ASSETS
// img1.png, img2.png are the guys that show up during the initial animation / bounce up and down
// icon.png is in the upper left part of the screen


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

	useEffect(() => {
		Aos.init({ duration: 1500 });
		setTimeout(function() {
			setAppShowImg(true)
		}, 500)
		setTimeout(function() {
			setAppShow(true)
		}, 2000)
	}, []);

	const showCase = [show1, show2, show3, show4, show5, show6, show7, show8]//, show9, show10, show11, show12, show13, show14, show15]

	// const pitchMaps = [ "World Cup excitement! Discord action centered around the tournament.", 
	// 				"Banter, memes and frequent contests with amazing prizes.", 
	// 				"Pitch will cover the tab of your group's watch party (2 each week)", 
	// 				"Preview of artwork for 1st NFT collection; utility and mint details released." 
	// 				]
	const pitchMaps = [
		"World Cup excitement, banter and community events with frequent prizes given!",
		"Football trivia and game prediction leaderboard",
		"Meme contests and fan art contests",
		"FIFA 21 gaming tournament",
		"Twitter Space co-hosted by professional commentator during WC games",
		"Discord coin economy redeemable in merch store",
		"Prize pool of 20+ items including signed gear by star players",
		"Pitch will organize and cover the tab of your group’s watch party (2 each week)",
		"Art preview for 1st NFT collection and mint details released"
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
						<a href={DISCORD_LINK}>
							<Image src={discord_icon} className="pitchDiscordIcon" />
						</a>
						<a href={TWITTER_LINK} style={{margin:0, padding:0}}>
							<Image src={twitter_icon} className="pitchTwitterIcon" />
						</a>
					</Flex>
				</Flex>
				<Flex direction={"column"} className="headerContent">
					<Text className="headerText headerBig">Football</Text>
					<Text className="headerText headerBig">Community</Text>
					<Text className="headerText headerBig">NFTs</Text>
					<Text className="headerText headerSml" style={{marginTop: 10}}>A new project</Text>
					<Text className="headerText headerSml">all about futbol for</Text>
					<Text className="headerText headerSml">the degen community.</Text>
					<Button className="headerDiscordButton">Join Discord</Button>
				</Flex>
			</Flex>
			<Flex w="100vw" height="40vh" className='whiteSquareBkg'>
				<Flex w="70vw" margin="2.5vw 15vw" direction="column">
					<Flex direction={["column","row"]}>
						<Flex className="qCard qCardTopLeft" direction="column">
							<Flex direction="row" justify="space-between" className="qCardTop">
								<Flex className="qCardYellow qCardXFlex"><Text className='qCardX'>x</Text></Flex>
								<a href={DISCORD_LINK} className="qCardYellow qCardButton">Banter here &gt;&gt;&gt;</a>
							</Flex>
							<Text className="qCardText qCardTextTop">Are you a football nut</Text>
							<Text className="qCardText">and want to show off</Text>
							<Text className="qCardText qCardBottom">your banter skills?</Text>
						</Flex>
						<Flex className="qCard qCardTopRight" direction="column">
							<Flex direction="row" justify="space-between" className="qCardTop">
								<Flex className="qCardOrange qCardXFlex"><Text className='qCardX'>x</Text></Flex>
								<a href={DISCORD_LINK} className="qCardOrange qCardButton">Celebrate here &gt;&gt;&gt;</a>
							</Flex>
							<Text className="qCardText qCardTextTop">Celebrate the glory of</Text>
							<Text className="qCardText">your team! Shame the players</Text>
							<Text className="qCardText qCardBottom">flopping to get a foul call!</Text>
						</Flex>
					</Flex>
					<Flex direction={["column","row"]}>
						<Flex className="qCard qCardBottomLeft" direction="column">
							<Flex direction="row" justify="space-between" className="qCardTop">
								<Flex className="qCardAqua qCardXFlex"><Text className='qCardX'>x</Text></Flex>
								<a href={DISCORD_LINK} className="qCardAqua qCardButton">Play here &gt;&gt;&gt;</a>
							</Flex>
							<Text className="qCardText qCardTextTop">Play trivia and</Text>
							<Text className="qCardText">win autographed jerseys</Text>
							<Text className="qCardText qCardBottom">from star players!</Text>
						</Flex>
						<Flex className="qCard qCardBottomRight" direction="column">
							<Flex direction="row" justify="space-between" className="qCardTop">
								<Flex className="qCardBlue qCardXFlex"><Text className='qCardX'>x</Text></Flex>
								<a href={DISCORD_LINK} className="qCardBlue qCardButton">Enter here &gt;&gt;&gt;</a>
							</Flex>
							<Text className="qCardText qCardTextTop">Enter a meme contest</Text>
							<Text className="qCardText">and win VIP</Text>
							<Text className="qCardText qCardBottom">match tickets!</Text>
						</Flex>
					</Flex>
				</Flex>
			</Flex>

			<Flex direction="column" w="100vw" height="100vh" className='visionBkg'>
				<Flex direction="column" justify="flex-end" w="40vw" height="100vh" className="visionImage">
					<Image src={pitch_soccer} w="24%" height="12%" />
					<Text className="visionHeader">What is Pitch?</Text>
					<Text className="visionText">Pitch is a new startup with a mission to create a community devoted to the future of the beautiful game in web3. It’s a place to have a kickass time and meet fellow fans. Pitch is for fans who love to banter, trivia nuts, gamers, memelords, and any footballer who enjoys a laugh.  Members will be rewarded with killer prizes and NFTs, with access to premium content and exclusive events.</Text>
				</Flex>
			</Flex>

			{/* <Flex direction="column" w="100vw" height="100vh" className='roadmapBkg'>
				<Flex w="100%" overflow="hidden" mt={["4", "0"]}>
					<Flex w={["90%", "70%"]} direction="column" data-aos="fade-right" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6">
						<Text fontSize={["15px", "17px"]}>
							<Text mb="10px">_</Text>

							<Text color="rgb(200,200,250)" mb="1" fontSize="20px">Pitch Roadmap</Text>
							<Text fontWeight="bold" fontSize={["20px", "30px" ]} mb="2">- Now</Text>
							<Flex direction="column" ml={["1", "12"]} w="100%" data-aos="fade-up">
								{
									pitchMaps.map((item, index) => (
										<Flex key={index} w="100%" mb="4" justify="space-between" pr={["0", "10%"]}>
											<Text w={["35px", "60px"]} fontWeight="bold" fontSize={["18px", "40px" ]}color="rgb(200,200,250)">0{index + 1}.</Text>
											<Text w="90%" mt={["0", "3"]} fontSize={["18px", "21px"]}>{item}</Text>
										</Flex>
									))
								}
							</Flex>
						</Text>
					</Flex>
					<Flex w={["10%", "30%"]} mt="100px" borderTop={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderRight={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderTopRightRadius="15px"></Flex>
				</Flex>
			</Flex> */}

			<Flex minHeight="100vh" w="100%" direction="column" bg="linear-gradient(290deg, rgb(24, 56, 41), rgb(43, 125, 87))" color="#fff" fontFamily="chalk" px={["4%", "6%"]} pt={["4%", "2.8%"]} pb={["8%", "2.8%"]}>
				
						
				<Text id="rdMap" visibility="hidden"></Text>
				<Flex w="100%" overflow="hidden" mt={["4", "0"]}>
					<Flex w={["90%", "70%"]} direction="column" data-aos="fade-right" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6">
						<Text fontSize={["15px", "17px"]}>
							<Flex align="center" mb="3" color="rgb(255, 213, 0)" fontSize="25px"><Flex h="60px" w="60px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(255, 213, 0)"><i className="mdi mdi-rocket"></i></Flex><Text mb="10px">_</Text></Flex>

							<Text color="rgb(200,200,250)" mb="1" fontSize="20px">Pitch Roadmap</Text>
							<Text fontWeight="bold" fontSize={["20px", "30px" ]} mb="2">- Now</Text>
							<Flex direction="column" ml={["1", "12"]} w="100%" data-aos="fade-up">
								{
									pitchMaps.map((item, index) => (
										<Flex key={index} w="100%" mb="4" justify="space-between" pr={["0", "10%"]}>
											<Text w={["35px", "60px"]} fontWeight="bold" fontSize={["18px", "40px" ]}color="rgb(200,200,250)">0{index + 1}.</Text>
											<Text w="90%" mt={["0", "3"]} fontSize={["18px", "21px"]}>{item}</Text>
										</Flex>
									))
								}
							</Flex>
						</Text>
					</Flex>
					<Flex w={["10%", "30%"]} mt="100px" borderTop={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderRight={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderTopRightRadius="15px"></Flex>
				</Flex>


				<Flex w="100%" mt={["6", "12"]} overflow="hidden">	
					<Flex w={["10%", "30%"]} mt="100px" borderTop={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderLeft={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderTopLeftRadius="15px"></Flex>
					<Flex w={["90%", "70%"]} direction="column" data-aos="fade-left" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6">
						<Text fontSize={["15px", "17px"]}>
							<Flex align="center" mb="3" color="rgb(255, 213, 0)" fontSize="25px"><Flex h="60px" w="60px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(255, 213, 0)"><i className="mdi mdi-google-circles-extended"></i></Flex><Text mb="10px">_</Text></Flex>

							<Text color="rgb(200,200,250)" mb="1" fontSize="20px">Pitch Roadmap</Text>
							<Text fontWeight="bold" fontSize={["20px", "30px" ]} mb="2">- Soon</Text>
							<Flex direction="column" ml={["1", "12"]} w="100%" data-aos="fade-up">
								<Text fontWeight="bold" fontSize={["18px", "27px" ]} mb="2">1st preliminary NFT collection launched Friday Dec 16th 2022:</Text>
								{
									pitchMaps2.map((item, index) => (
										<Flex key={index} w="100%" mb="4" justify="space-between" pr={["0", "10%"]}>
											<Text w={["35px", "60px"]} fontWeight="bold" fontSize={["18px", "40px" ]}color="rgb(200,200,250)">0{index + 1}.</Text>
											<Text w="90%" mt={["0", "3"]} fontSize={["18px", "21px"]}>{item}</Text>
										</Flex>
									))
								}
							</Flex>
							<Flex direction="column" ml={["1", "12"]} w="100%" data-aos="fade-up" mt="6">
								<Text fontWeight="bold" fontSize={["18px", "27px" ]} mb="2">Holder benefits include:</Text>
								{
									pitchMaps3.map((item, index) => (
										<Flex key={index} w="100%" mb="4" justify="space-between" pr={["0", "10%"]}>
											<Text w={["35px", "60px"]} fontWeight="bold" fontSize={["18px", "40px" ]}color="rgb(200,200,250)">0{index + 1}.</Text>
											<Text w="90%" mt={["0", "3"]} fontSize={["18px", "21px"]}>{item}</Text>
										</Flex>
									))
								}
							</Flex>

						</Text>
					</Flex>
				</Flex>

				<Flex w="100%" overflow="hidden" mt={["6", "12"]}>
					<Flex w={["90%", "70%"]} direction="column" data-aos="fade-right" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6">
						<Text fontSize={["15px", "17px"]}>
							<Flex align="center" mb="3" color="rgb(255, 213, 0)" fontSize="25px"><Flex h="60px" w="60px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(255, 213, 0)"><i className="mdi mdi-crown"></i></Flex><Text mb="10px">_</Text></Flex>

							<Text color="rgb(200,200,250)" mb="1" fontSize="20px">Pitch Roadmap</Text>
							<Text fontWeight="bold" fontSize={["20px", "30px" ]} mb="2">- Future</Text>
							<Flex direction="column" ml={["1", "12"]} w="100%" data-aos="fade-up">
								{
									pitchMaps4.map((item, index) => (
										<Flex key={index} w="100%" mb="4" justify="space-between" pr={["0", "10%"]}>
											<Text w={["35px", "60px"]} fontWeight="bold" fontSize={["18px", "40px" ]} color="rgb(200,200,250)">0{index + 1}.</Text>
											<Text w="90%" mt={["0", "3"]} fontSize={["18px", "21px"]}>{item}</Text>
										</Flex>
									))
								}
							</Flex>
						</Text>
					</Flex>
					<Flex w={["10%", "30%"]} mt="100px" borderTop={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderRight={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderTopRightRadius="15px"></Flex>
				</Flex>

				<Flex justify="center" mt={["6", "12"]} backgroundColor="rgba(255,255,255,0.03)" borderRadius="8px" py="12" className="bgStars">
					<Flex w="100%" direction="column" align="center">
						<Text fontWeight="bold" fontSize={["24px", "30px"]}>
							The Team
						</Text>
						<Flex w="100%" justify="center" px="10%" direction={["column", "row"]}>
							<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
								<Text fontWeight="bold" fontSize={["21px", "30px"]} mt={["12", "100px"]} mb="2" data-aos="fade-up">
									Founder
								</Text>
								<Image w={["170px", "200px"]} h={["170px", "200px"]} borderRadius="100%" src={founder1} mt="6" data-aos="fade-up" />
								<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
								<Text color="rgb(200,200,250)" cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/UnFunkableToken", "_BLANK")}>@UnFunkableToken</Text>
								A data scientist turned entrepreneur, with a renewed focus on leadership & product development, and experience across tech, finance, and philanthropy.  Pursuing web3 ventures full-time after leaving a senior management role at Facebook earlier this year.  A lifelong player, fan and coach…rooting for Team USA in the World Cup!
								</Text>
							</Flex>

							<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
								<Text fontWeight="bold" fontSize={["21px", "30px"]} mt={["12", "100px"]} mb="2" data-aos="fade-up">
									Artist
								</Text>
								<Image w={["170px", "200px"]} h={["170px", "200px"]} borderRadius="100%" src={founder2} mt="6" data-aos="fade-up" />
								<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
								<Text color="rgb(200,200,250)" cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/HorstVonMueller", "_BLANK")}>@HorstVonMueller</Text>
								Creative industry professional with 25+ years experience, working with Mercedes, Porsche, Samsung, and the like. Only to find out that it feels much better to do art at the root of something new and take part in a developing revolution of the creative industry. 
								</Text>
							</Flex>
						</Flex>

						<Flex w="100%" justify="center" px="10%" direction={["column", "row"]}>
							<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
								<Text fontWeight="bold" fontSize={["21px", "30px"]} mt={["12", "100px"]} mb="2" data-aos="fade-up">
									Developer
								</Text>
								<Image w={["170px", "200px"]} h={["170px", "200px"]} borderRadius="100%" src={founder3} mt="6" data-aos="fade-up" />
								<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
								<Text color="rgb(200,200,250)" cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/TheLunaLabs", "_BLANK")}>@TheLunaLabs</Text>
								Luna studies how galaxies form their stars by performing numerical simulations with some of the largest supercomputers yet known to mankind and loves living on the cutting-edge of our evolvingly technocratic society. Luna has developed dozens of discord bots, smart contracts, and minting dapps and enjoys the breathtaking speed of digital evolution known as web3. Luna is a fan of Sadio Mané and Bayern München.
								</Text>
							</Flex>

							<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
								<Text fontWeight="bold" fontSize={["21px", "30px"]} mt={["12", "100px"]} mb="2" data-aos="fade-up">
									Marketing/Community/Strategy
								</Text>
								<Image w={["170px", "200px"]} h={["170px", "200px"]} borderRadius="100%" src={founder4} mt="6" data-aos="fade-up" />
								<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
								<Text color="rgb(200,200,250)" cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/uav1869", "_BLANK")}>@uav1869</Text>
								E-commerce wiz with over 10 years of experience. Now consulting startup’s across all industries. Web3 enthusiast committed to creating one degen at a time. Dead ball specialist. 
								</Text>
							</Flex>
						</Flex>

						<Flex align="center" w={["100%","200%"]} px="10%" direction={["column", "row"]} justify="center">

							<Flex w={["100%", "50%"]} direction="column" align="center">
								<Text fontWeight="bold" fontSize={["21px", "30px"]} mt={["12", "100px"]} mb="2" data-aos="fade-up">
									Community/Moderation
								</Text>

								<Flex w="100%" align="center" justify="center" px="0%" direction={["column", "row"]}>
									<Flex direction="column" align="center" w={["100%", "50%"]}>
										<Image w={["170px", "200px"]} h={["170px", "200px"]} borderRadius="100%" src={founder5} mt="6" data-aos="fade-up" />

										<Text fontSize={["14px", "18px"]} textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
										<Text color="rgb(200,200,250)" cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/fede_rr_", "_BLANK")}>@fede_rr_</Text>
										IP lawyer who fell in love with Web3 and NFTs: fascinated by the new routes Web3 is opening in terms of management and exploitation of IP rights.  Been in this space since 2021, moderating and building communities.  Petrolhead with a green heart, I spend most of my free time in the mountains, either with my bicycle or my motorbike.  Professional cat petter and wine lover.
										”There’s only one Ronaldo, and his name is not Cristiano”.
										</Text>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>

				<Flex w="100%" mt={["6", "12"]} data-aos="fade-up" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6" direction="column" align="center">
					<Flex align="flex-start" direction={["column", "row"]}>
						<Flex mr="6" mt={["2", "1"]} align="center" mb="3" color="rgb(255, 42, 0)" fontSize="50px"><Text mb="25px">_</Text><Flex h="100px" w="100px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(255, 42, 0)"><i className="mdi mdi-hand"></i></Flex></Flex>
						<Text>
							<Text fontWeight="bold" fontSize="30px">
								FAQ
							</Text>

							<Text mb="4" fontSize={["17px", "24px"]}>
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
						<a href={TWITTER_LINK}>
							<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]} align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.1)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.3)"}} cursor="pointer" className="bounce" mr={["3", "5" ]} onClick={() => window.open({TWITTER_LINK}, "_BLANK")}><i className="mdi mdi-twitter"></i></Flex>
						</a>

						<a href={DISCORD_LINK}>
							<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]}  align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.1)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.3)"}} className="bounce" mr={["3", "5" ]} cursor="pointer" onClick={() => window.open({DISCORD_LINK}, "_BLANK")}><i className="mdi mdi-discord"></i></Flex>
						</a>

						<a href={INSTAGRAM_LINK}>
							<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]}  align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.1)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.3)"}} className="bounce2" onClick={() => window.open({INSTAGRAM_LINK}, "_BLANK")} cursor="pointer"><i className="mdi mdi-instagram"></i></Flex>
						</a>
					</Flex>
				</Flex>
			</Flex>
		</ChakraProvider>
	)
}

export default App;
