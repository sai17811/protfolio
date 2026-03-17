import { NextResponse } from "next/server";

const LEETCODE_API = "https://leetcode.com/graphql";

const query = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
        totalActiveDays
      }
    }
  }
`;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "nagasaitac143";
    const year = searchParams.get("year");

    try {
        const res = await fetch(LEETCODE_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com",
                "Origin": "https://leetcode.com",
                "User-Agent": "Mozilla/5.0",
            },
            body: JSON.stringify({
                query,
                variables: {
                    username,
                    year: year ? parseInt(year) : undefined,
                },
            }),
            cache: "no-store",
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("LeetCode API error:", res.status, text);
            return NextResponse.json(
                { error: "Failed to fetch LeetCode data", detail: text },
                { status: res.status }
            );
        }

        const data = await res.json();
        const calendar =
            data?.data?.matchedUser?.userCalendar?.submissionCalendar;
        const totalActiveDays =
            data?.data?.matchedUser?.userCalendar?.totalActiveDays;

        if (!calendar) {
            return NextResponse.json(
                { error: "User not found or no data", raw: data },
                { status: 404 }
            );
        }

        return NextResponse.json({
            submissionCalendar: JSON.parse(calendar),
            totalActiveDays,
        });
    } catch (err) {
        console.error("LeetCode API catch:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
