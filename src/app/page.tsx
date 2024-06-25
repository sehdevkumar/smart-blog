"use server";

import LandingPage from "./(features)/landing/page";


export default async function HomePage() {
  return (
    <main className="w-screen h-screen overflow-hidden grid px-[10px]">
       <LandingPage/>
    </main>
  );
}
