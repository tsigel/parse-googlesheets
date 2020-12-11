import { number, parseGoogleSheets, string } from '../src';
import { data } from './data';

describe('Google sheets parse', () => {

    const schema = {
        fileName: {
            parse: string,
            columnName: 'filename'
        },
        projectName: {
            parse: string,
            columnName: 'project'
        },
        year: {
            parse: number,
            columnName: 'YY'
        },
        videoLinkText: {
            parse: string,
            columnName: 'menu'
        },
        youtubeVideoId: {
            parse: string,
            columnName: 'YT'
        },
        pageTitle: {
            parse: string,
            columnName: 'header'
        },
        pageText: {
            parse: string,
            columnName: 'sub header'
        },
        pageDateText: {
            parse: string,
            columnName: 'date'
        },
        pageLinkUrl: {
            parse: string,
            columnName: 'url'
        },
        facebookId: {
            parse: string,
            columnName: 'FB'
        },
        playListId: {
            parse: string,
            columnName: 'PLAYLIST'
        }
    };

    it('Check parse', () => {
        const parsed = parseGoogleSheets(schema, data);
        expect(parsed).toEqual([
            {
                'pageDateText': undefined,
                'pageLinkUrl': undefined,
                'playListId': undefined,
                'videoLinkText': 'joom',
                'year': 20,
                'projectName': 'joom_1111',
                'fileName': 'a20joom4',
                'youtubeVideoId': 'rxvm4hkkB7s',
                'pageTitle': 'Распродажа классных товаров',
                'pageText': 'Joom 11.11',
                'facebookId': 'https://www.facebook.com/miguelivanovagency/posts/1630728270422490'
            },
            {
                'facebookId': undefined,
                playListId: undefined,
                pageLinkUrl: undefined,
                pageDateText: undefined,
                pageText: undefined,
                'videoLinkText': 'drom',
                'year': 20,
                'projectName': 'drom2',
                'fileName': 'a20drom2',
                'youtubeVideoId': 'PLwk0myQlRMEI4oxM9HoK-rTj-b5yINvd1',
                'pageTitle': 'Дром продолжает рулить'
            },
            {
                pageDateText: undefined,
                pageLinkUrl: undefined,
                facebookId: undefined,
                playListId: undefined,
                'videoLinkText': 'cian',
                'year': undefined,
                'projectName': 'cian2',
                'fileName': 'a20cian2',
                'youtubeVideoId': 'PLwk0myQlRMEKdkqF2OiLOf6poDEw52fhO',
                'pageTitle': 'Легко сказать "Нет"',
                'pageText': 'Циан защищает интересы собственников'
            },
            {
                pageLinkUrl: undefined,
                pageDateText: undefined,
                'videoLinkText': 'sk',
                'year': 20,
                'projectName': 'sk',
                'fileName': 'a20sk',
                'youtubeVideoId': 'PLwk0myQlRMEK4yWeYctFs3iG2l_Ps_Qg3',
                'pageTitle': 'В Париже можно не готовить',
                'pageText': '"Sибирская Коллекция" продолжает кампанию "Самое важное - внутри"',
                'facebookId': 'https://www.facebook.com/miguelivanovagency/posts/1544141032414548',
                'playListId': '3'
            },
            {
                'videoLinkText': 'joom',
                'year': 20,
                'projectName': 'joom3',
                'fileName': 'a20joom3',
                'youtubeVideoId': 'PLwk0myQlRMEK39qtTRHk8J79LoZ8ODlqS',
                'pageTitle': 'Joom вертит кодом',
                'pageText': 'В ролике с блогером Маш Милаш Joom использовал новую механику интеграции QR-кода — его нужно «поймать» и отсканировать, чтобы получить скидки.',
                'pageDateText': '27 августа 2020',
                'pageLinkUrl': 'https://www.sostav.ru/publication/joom-44921.html',
                'facebookId': 'https://www.facebook.com/dasha.sherstobitova/videos/10214427529121015',
                'playListId': '3'
            },
            {
                'videoLinkText': 'rabota.ru',
                pageDateText: undefined,
                playListId: undefined,
                facebookId: undefined,
                'year': 20,
                'projectName': 'rabotaru2',
                'fileName': 'a20rabotaru2',
                'youtubeVideoId': 'PLwk0myQlRMEISLybxa3oy1xNie7ULAT0h',
                'pageTitle': 'Найди работу лучше ',
                'pageText': 'vr все дела',
                'pageLinkUrl': 'http://www.advertology.ru/article150040.htm'
            },
            {
                playListId: undefined,
                pageText: undefined,
                'videoLinkText': 'joom',
                'year': 20,
                'projectName': 'joom2',
                'fileName': 'a20joom2',
                'youtubeVideoId': 'vfN-oipF-6M',
                'pageTitle': 'С днем рождения, Joom!',
                'pageDateText': '26 мая 2020',
                'pageLinkUrl': 'https://www.sostav.ru/publication/joom-ispolnyaetsya-chetyre-marketplejs-anonsiroval-svoj-den-rozhdeniya-i-rasprodazhu-yarkim-rolikom-43497.htmll',
                'facebookId': 'https://www.facebook.com/miguelivanovagency/posts/1489782807850371'
            },
            {
                'videoLinkText': 'cian',
                'year': 20,
                'projectName': 'cian',
                'fileName': 'a20cian',
                'youtubeVideoId': 'PLwk0myQlRMELmCmSpPRdH-fNQV7wYi4Ol',
                'pageTitle': 'Сначала ищи на Циан',
                'pageText': 'Ванная с окном, гостиная с высокими потолками, квартира с гардеробной: новые поисковые запросы на Циан',
                'pageDateText': '27 января 2020',
                'pageLinkUrl': 'http://sostav.ru/',
                'facebookId': 'https://www.facebook.com/dasha.sherstobitova/posts/10213508230859133',
                'playListId': '3'
            },
            {
                playListId: undefined,
                'videoLinkText': 'drom',
                'year': 20,
                'projectName': 'drom',
                'fileName': 'a20drom',
                'youtubeVideoId': 'PLwk0myQlRMEKClmYjy_YCW1S8MIGXj4NB',
                'pageTitle': 'Федеральный релонч Дром.ру',
                'pageText': 'Дром рулит',
                'pageDateText': '25 марта 2020',
                'pageLinkUrl': 'https://www.tinkoff.ru/about/news/06082018-tinkoff-investicii-poluchili-nagradu-zhurnala-global-finance-v-nominacii-best-investment-management/',
                'facebookId': 'https://www.facebook.com/watch/?v=836042236896622&extid=fBirXEhaLCIsw1lB'
            },
            {
                playListId: undefined,
                facebookId: undefined,
                pageDateText: undefined,
                pageLinkUrl: undefined,
                'videoLinkText': 'rabota.ru',
                'year': 20,
                'projectName': 'rabotaru',
                'fileName': 'a20rabotaru',
                'youtubeVideoId': 'PLwk0myQlRMELj-oI7CWHKf4-Zy7P8W3mM',
                'pageTitle': 'Работа.ру: №2 в топ-чартах Apple Store категории "Бизнес" по итогам двух недель ротации роликов',
                'pageText': 'Рекламная кампания, которую невозможно игнорировать'
            }
        ]);
    });
});