import { Descriptions, Flex, Typography, Tag } from "antd";
import { getMovie } from "../../utils/requests";
import "./MoviePage.css";

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            getMovie(id)
            .then((res) => {
                setMovie(res.data.data);
            })
            .catch((err) => {
				console.error('Ошибка загрузки фильма:', err)
				setError('Не удалось загрузить информацию о фильме')
            })
            .finally(() => {
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) {
        return (
            <div id="movie-page" className="content-movie-container">
                <Flex justify="center" align="center" style={{ height: "400px" }}>
                    <Typography.Title level={3}>
                        Загрузка фильма...
                    </Typography.Title>
                </Flex>
            </div>
        );
    }

    if (error) {
        return (
            <div id="movie-page" className="content-movie-container">
                <Typography.Title level={3} style={{ color: "#ff4d4f" }}>
                    {error}
                </Typography.Title>
            </div>
        );
    }

    if (!movie) {
        return (
            <div id="movie-page" className="content-movie-container">
                <Typography.Title level={3}>
                    Фильм не найден
                </Typography.Title>
            </div>
        );
    }

    const items = [
        {
            label: "год",
            children: movie.details.year
        },
        {
            label: "режиссер",
            children: movie.details.director
        },
        {
            label: "сценарист",
            children: movie.details.screenwriter
        },
        {
            label: "жанр",
            children: (
                <>
                    {movie.details.genres.map((genre) => (
                        <Tag color="#FF7A85" key={genre}>
                            {genre}
                        </Tag>
                    ))}
                </>
            )
        },
        {
            label: "страна",
            children: movie.details.country
        },
        {
            label: "описание",
            children: movie.details.description,
            span: 3
        }
    ];

    return (
        <div id="movie-page">
            <div className="content-movie-container">
                <Flex gap={30} align="center">
                    <Typography.Title className="movie-title" level={4}>
                        {movie.title.ru}
                    </Typography.Title>
                    <Typography.Title className="movie-title light" level={4}>
                        {movie.title.en}
                    </Typography.Title>
                </Flex>
            </div>
            <div className="content-movie-container">
                <Flex gap={90}>
                    <img className="movie-img" src={movie.poster}></img>
                    <div className="movie-info-container">
                        <Flex></Flex>
                            <Descriptions
                                column={1}
                                colon={false}
                                title={"О фильме"}
                                bordered
                                items={items}
                            ></Descriptions>
                    </div>
                </Flex>
            </div>
            <div className="content-movie-container"></div>
        </div>
    );
};

export default MoviePage;
