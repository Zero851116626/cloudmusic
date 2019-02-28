//需要调用后端接口，后端接口在本机运行,获取各种列表
const url = "http://localhost:3000";
export default {
    //home的布置所需要的接口
    //导出banner
    getBanner(){
        return `${url}/banner`;
    },
    //导出推荐歌单
    getRecommendList(){
        return `${url}/personalized`;
    },
    //获得最新音乐
    getLastestMusic(){
        return `${url}/album/newest`;
    },
    //主播电台
    getHostStation(){
        return `${url}/personalized/djprogram`
    },
    //根据歌单id获取歌单详细
    getListDetails(){
        return `${url}/playlist/detail`
    },
    //根据歌曲id获得歌曲详情
    getmusicDetails(){
        return `${url}/song/detail`
    },
    getmusicUrl(){
        return `${url}/song/url`
    },
    //搜索页面制作
    Searchinfo(){
        return `${url}/search`
    }
}


