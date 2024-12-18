import { Buffer } from "node:buffer";
import { MySQLPacket } from "../packet/Packet.ts";
import { QueryPacket } from "../packet/QueryPacket.ts";
import { QueryResponsePacket } from "../packet/QueryResponsePacket.ts";

export class PacketParser {
  public static parse(buffer: Buffer, options: { source: 'client' | 'server' }): QueryPacket | QueryResponsePacket | MySQLPacket {
    switch(options.source) {
      case 'client':
        return QueryPacket.fromBuffer(buffer);
      case 'server':
        return QueryResponsePacket.fromBuffer(buffer);
    }
  }

  public static getPacketOrigin(buffer: Buffer): 'CLIENT' | 'SERVER' {
    const sequenceId = buffer.readUIntLE(3, 1);
    if (sequenceId === 0) {
      return 'CLIENT';
    } else {
      return 'SERVER';
    }
  }
}
