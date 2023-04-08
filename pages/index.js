import RegisterPage from "@/components/ConcursantePage";
import CheckInternet from "@/components/checkInternet";
import MoviePage from "@/components/movie";
export default function Home() {
  return (
    <div>
      <MoviePage />
      <CheckInternet />
      <RegisterPage />
    </div>
  );
}
