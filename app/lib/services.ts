// about page

import { env } from "@/lib/env";
import type { BoardMember } from "./types";

type BoardMemberResp = {
  board_of_trustees: BoardMember[];
  board_of_advisers: BoardMember[];
};

async function fetchBoardMembers() {
  try {
    const resp = await fetch(`${env.BASEURL}/home/board`);
    const data = await resp.json();
    return data as BoardMemberResp;
  } catch (error) {
    console.log("board members fetch error");
    throw error;
  }
}

export { fetchBoardMembers };
