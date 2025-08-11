import BlogPageMain from "../components/site/BlogPageMain";
import BottomContact from "../components/site/BottomContact";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import PageContent from "../layouts/PageContent";

function BlogPage() {
  return (
    <PageContent>
      <Header />
      <img
        className="mt-22 h-[30rem] w-full object-cover"
        src="/images/main-slider-1.webp"
        alt=""
      />
      <BlogPageMain />
      <BottomContact />
      <Footer />
    </PageContent>
  );
}

export default BlogPage;
