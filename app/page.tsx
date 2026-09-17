'use client'

import { useCallback, useEffect, useState } from 'react'
import { BottomNav, type TabId } from '@/components/mafia/bottom-nav'
import { HomeScreen } from '@/components/mafia/home-screen'
import { JoinRoomModal } from '@/components/mafia/join-room-modal'
import { LobbyScreen } from '@/components/mafia/lobby-screen'
import { RoleReveal } from '@/components/mafia/role-reveal'
import { DiscoverScreen } from '@/components/mafia/discover-screen'
import { RulesScreen } from '@/components/mafia/rules-screen'
import {
  createRoom,
  joinRoom,
  startGame,
  leaveRoom,
  subscribeRoom,
  type Room,
} from '@/lib/supabase'

export default function Page() {
  const [tab, setTab] = useState<TabId>('match')
  const [joinOpen, setJoinOpen] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)

  const [roomCode, setRoomCode] = useState<string | null>(null)
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [room, setRoom] = useState<Room | null>(null)

  // Realtime subscription: any change to the room (join, leave, start) updates
  // this view automatically, across tabs.
  useEffect(() => {
    if (!roomCode) return
    const unsubscribe = subscribeRoom(roomCode, setRoom)
    return unsubscribe
  }, [roomCode])

  const me = room?.players.find((p) => p.id === playerId) ?? null
  const isHost = !!me?.isHost

  const handleCreate = useCallback(() => {
    const session = createRoom('أنت')
    setPlayerId(session.playerId)
    setRoomCode(session.roomCode)
  }, [])

  const handleJoin = useCallback((code: string, name: string) => {
    const result = joinRoom(code, name)
    if (!result.ok) {
      setJoinError(result.error)
      return
    }
    setPlayerId(result.session.playerId)
    setRoomCode(result.session.roomCode)
    setJoinOpen(false)
    setJoinError(null)
  }, [])

  const handleStart = useCallback(() => {
    if (roomCode) startGame(roomCode)
  }, [roomCode])

  const handleLeave = useCallback(() => {
    if (roomCode && playerId) leaveRoom(roomCode, playerId)
    setRoomCode(null)
    setPlayerId(null)
    setRoom(null)
  }, [roomCode, playerId])

  function renderMatch() {
    // In a room and the game has started -> secret role card.
    if (room && room.status === 'playing' && me?.role) {
      return <RoleReveal roleId={me.role} onBack={handleLeave} />
    }
    // In a room, waiting in the lobby.
    if (room && roomCode) {
      return (
        <LobbyScreen
          room={room}
          playerId={playerId!}
          isHost={isHost}
          onStart={handleStart}
          onLeave={handleLeave}
        />
      )
    }
    // Not in a room.
    return (
      <HomeScreen onCreate={handleCreate} onJoin={() => setJoinOpen(true)} />
    )
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-[#121212]">
      <main className="flex flex-1 flex-col">
        {tab === 'match' && renderMatch()}
        {tab === 'discover' && (
          <DiscoverScreen
            onJoin={() => {
              setTab('match')
              setJoinOpen(true)
            }}
          />
        )}
        {tab === 'rules' && <RulesScreen />}
      </main>

      <div className="sticky bottom-0">
        <BottomNav active={tab} onChange={(id) => setTab(id)} />
      </div>

      <JoinRoomModal
        open={joinOpen}
        error={joinError}
        onClearError={() => setJoinError(null)}
        onClose={() => {
          setJoinOpen(false)
          setJoinError(null)
        }}
        onJoin={handleJoin}
      />
    </div>
  )
}
