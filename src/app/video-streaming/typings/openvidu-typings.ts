export interface SessionConnections {
  numberOfElements: number;
  content: Array<Connection>;
}

export enum SessionConnectionHandling {
  STREAM_CREATED = 'streamCreated',
  STREAM_DESTROYED = 'streamDestroyed',
  STREAM_PROPERTY_CHANGED = 'streamPropertyChanged',
  VIDEO_ELEMENT_CREATED = 'videoElementCreated',
  STREAM_PLAYING = 'streamPlaying',
  VIDEO_ELEMENT_DESTROYED = 'videoElementDestroyed',
  COMMON_EXCEPTIONS = 'exception',
  SESSION_DISCONNECTED = 'sessionDisconnected',
  CONNECTION_DESTROYED = 'connectionDestroyed',
  CONNECTION_CREATED = 'connectionCreated',
  RECONNECTING_SESSION = 'reconnecting',
  RECONNECTED_SESSION = 'reconnected',
}

export interface DefaultRecordingProperties {
  name: string;
  hasAudio: boolean;
  hasVideo: boolean;
  outputMode: string;
  recordingLayout: string;
  resolution: string;
  frameRate: number;
  shmSize: number;
  mediaNode: string;
}

export interface SessionContent {
  allowTranscoding: boolean;
  connections: SessionConnections;
  createdAt: number;
  customSessionId: string;
  defaultRecordingProperties: DefaultRecordingProperties;
  forcedVideoCodec: string;
  forcedVideoCodecResolved: string;
  id: string;
  mediaMode: string;
  object: string;
  recording: false;
  recordingMode: string;
  sessionId: string;
}

export interface SessionObject {
  content: Array<SessionContent>;
  numberOfElements: number;
}

export interface Connection {
  activeAt: null;
  adaptativeBitrate: null;
  clientData: null;
  connectionId: string;
  createdAt: number;
  customIceServers: Array<any>;
  id: string;
  ip: null;
  kurentoOptions: null;
  location: null;
  networkCache: null;
  object: string;
  onlyPlayWithSubscribers: null;
  platform: null;
  publishers: null;
  record: boolean;
  role: string;
  rtspUri: string | null;
  serverData: string;
  sessionId: string;
  status: string;
  subscribers: string;
  token: string;
  type: string;
}
export interface IDataOfFullScreenPopup {
  cameraName: string;
}
export interface IPtzPauseResult {
  message: string;
  ptz_control_url: string;
}

export interface OpenViduServerConnectionConfig {
  openvidu_secret: string;
  openvidu_url: string;
  session_id: string;
}
