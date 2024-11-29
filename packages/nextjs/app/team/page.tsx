import { NextPage } from "next";
import Image from "next/image";

const TeamPage: NextPage = () => {

    const teams = [
        {
            name: 'Charlie',
            description: 'Charlie is the mastermind behind the MeltyFi protocol. A dedicated researcher and PhD in the blockchain and crypto space, he’s a full-stack developer with a deep passion for game theory—and an undeniable love for chocolate. 🍫🚀',
            image: '/team-01.png'
        },
        {
            name: 'Willy',
            description: 'Willy is a full-stack developer who has been building blockchain solutions since 2015, starting with Bitcoin and later expanding to Ethereum and other chains. Passionate about startups, lean and agile methodologies, and design thinking, he thrives on creating innovative solutions at lightning speed and loves competing in hackathons. 🚀',
            image: '/team-02.png'
        },
        {
            name: 'Skeebo',
            description: 'Skeebo is a seasoned full-stack developer with a strong focus on front-end development. He has contributed to numerous crypto projects and made a mark in 2024 by winning the ETH Rome hackathon with an innovative project based on WhistleBlower. A true builder in the Web3 space, Skeebo combines creativity and technical expertise to deliver impactful solutions. 🌟',
            image: '/team-03.png'
        }
    ]


    return (
        <div className="mx-auto max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <div className="bg-[#763C00] bg-opacity-60 p-2 pt-3 px-5 rounded-full mb-5">
                <h1>The MeltyFi Team</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full text-center">
                {teams.map((team, index) => (
                    <div key={index} className="flex flex-col items-center ">
                    <Image
                        src={team.image}
                        alt={team.name}
                        width={200}
                        height={200}
                        className="w-48 h-48 object-cover rounded-full border-4 border-gray-300 shadow-2xl"
                    />
                    <h2 className="text-5xl mt-4 text-choco">{team.name}</h2>
                    <div className="m-3 p-5 rounded-3xl bg-[#763C00] bg-opacity-60 shadow-2xl">{team.description}</div>
                    </div>
                ))}
                </div>

        </div>
    )
}

export default TeamPage;