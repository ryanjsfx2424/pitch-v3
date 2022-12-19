import React from "react";
import { 
	Flex,
	Image,
} from "@chakra-ui/react";
import "./styles/App.scss";
import pitch_icon from "./images/pitch_soccer_logo.png"
import discord_icon from "./images/discord_button.png"
import twitter_icon from "./images/twitter_button.png"

function Navbar() {
	const url = window.location.href;
	const isMintPage = url.includes("mint");
	return (
		<Flex className='pitchNavbar' marginTop={["4%", "1%"]} justify="space-between">
			<Image src={pitch_icon} className="pitchNavbarLogo" h="80%"/>
			<Flex>
                <div style={{cursor:"pointer"}}>
                    <Image src={discord_icon} className="pitchDiscordIcon" onClick={() => window.open("https://discord.gg/EVfKShm6", "_BLANK")} />
                </div>
                <div style={{cursor:"pointer"}}>
                    <Image marginRight="20px" src={twitter_icon} className="pitchTwitterIcon" onClick={() => window.open("https://twitter.com/pitchweb3", "_BLANK")} />
                </div>
			</Flex>
		</Flex>
	)
}

export default Navbar;