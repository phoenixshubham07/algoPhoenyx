import LandingPage from "@/components/LandingPage";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AlgoPhoenyx - Fall.Code.Burn.',
  description: 'Finding the Spark at the Nexus of Creativity and Code.',
};

export default function Home() {
  return <LandingPage />;
}

