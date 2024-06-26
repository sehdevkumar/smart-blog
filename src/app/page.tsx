"use server";

import FeaturePage from "./(features)/page";


export default async function HomePage() {
  return (
    <main className="w-screen h-screen overflow-hidden grid px-[10px]">
       <FeaturePage/>
    </main>
  );
}
