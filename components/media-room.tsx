"use client";

import { useEffect, useState } from "react";
import {
	ControlBar,
	GridLayout,
	LiveKitRoom,
	ParticipantTile,
	RoomAudioRenderer,
	useTracks,
} from "@livekit/components-react";

import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Track } from "livekit-client";

interface MediaRoomProps {
	chatId: string;
	video: boolean;
	audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
	const { user } = useUser();
	const [token, setToken] = useState("");

	useEffect(() => {
		if (!user?.firstName || !user?.lastName) return;

		const name = `${user.firstName} ${user.lastName}`;

		(async () => {
			try {
				const resp = await fetch(
					`/api/livekit?room=${chatId}&username=${name}`
				);
				const data = await resp.json();
				setToken(data.token);
			} catch (e) {
				console.log(e);
			}
		})();
	}, [user?.firstName, user?.lastName, chatId]);

	if (token === "") {
		return (
			<div className="flex flex-col flex-1 justify-center items-center">
				<Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
				<p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
			</div>
		);
	}

	return (
		<LiveKitRoom
			video={video}
			audio={audio}
			token={token}
			serverUrl={process.env.LIVEKIT_URL}
			data-lk-theme="default"
			style={{ height: "100dvh" }}
		>
			<MyVideoConference />
			<RoomAudioRenderer />
			<ControlBar />
		</LiveKitRoom>
	);
};

function MyVideoConference() {
	const tracks = useTracks(
		[
			{ source: Track.Source.Camera, withPlaceholder: true },
			{ source: Track.Source.ScreenShare, withPlaceholder: false },
		],
		{ onlySubscribed: false }
	);
	return (
		<GridLayout
			tracks={tracks}
			style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
		>
			<ParticipantTile />
		</GridLayout>
	);
}
