import {
  HubConnection,
  IHttpConnectionOptions,
  LogLevel,
  ILogger,
  HttpTransportType,
  IHubProtocol,
  IRetryPolicy,
} from '@microsoft/signalr'

export interface Options {
  onConnected?: (hub: HubConnection) => void;
  onDisconnected?: (error?: Error) => void;
  onReconnecting?: (error?: Error) => void;
  onReconnected?: (connectionId?: string) => void;
  onError?: (error?: Error) => void;
  enabled?: boolean;
  skipNegotiation?: boolean;
  automaticReconnect?: number[] | IRetryPolicy | boolean;
  httpTransportTypeOrOptions?: IHttpConnectionOptions | HttpTransportType;
  hubProtocol?: IHubProtocol;
  logging?: LogLevel | string | ILogger;
}

const DEFAULTS: Options = {
  enabled: true,
  skipNegotiation: false,
}

export let defaultOptions: Options = DEFAULTS

export const setDefaults = (options: Options) => {
  defaultOptions = {
    ...DEFAULTS,
    ...options,
  }
}
