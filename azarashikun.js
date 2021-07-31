//HTML各エリアの宣言
const $textArea = document.getElementById('text-area');
const $graphicArea = document.getElementById('graphic-area');
const $resultDivided = document.getElementById('result-area');
const $tweetDivided = document.getElementById('tweet-area');
const $allDivided = document.getElementById('all-area');
const $edGraphicArea = document.getElementById('ed-graphic-area');


//あざらし君のステータス変数（エンディングに影響する）
var moral = 0; //道徳的な傾向を評価
var love = 0;　//母性的な傾向を評価
var cowardly = 0; //卑劣的な傾向を評価
var rage = 0;　//暴力的な傾向を評価

//選択肢の判定セット。質問、回答、イメージ画像を格納。フラグはボタンコントール用のファンクションで別途管理
const selectSet = [
  { 
    question : '「お兄ちゃん、お腹すいたよ～」妹がママからもらったミルクをわけてくれと言い出した。アイツ自分の飲んだくせに。どうする？',
　　answer: [
  '「ママからもらってきてあげる」冷静に説得',
  '「兄だから我慢しなきゃ」自己犠牲でわけてあげる',
  '「ちょっと待ってろ」水とすり替えダマす',
  '「ボスが太りすぎと言っている！」怒鳴りつけて全部のむ'
],
　　imgGraphic : 'img1.jpg',
　　},
  {
    question : '登校中、友達のあざ太郎がシロクマに襲われた！　勝てそうもないが…どうする？',
　　answer: [
  '「あざ太郎、逃げろ！」大声で呼び掛ける',
  '「ここは僕が！」死を覚悟しシロクマと戦う',
  '「ぁぶなぃ…」タゲ取らないように、か細く止める',
  '「ブレーキが故障して止められない」結末を期待し眺めている'
  ],
  imgGraphic : 'img2.jpg',
　　},
  {
     question : '「あざ吉ウザくね。お前も無視しろ」学校でイジメが発生中。どうする？',
　　answer: [
  '「イジメかっこ悪い！」先生に報告し対抗する',
  'かわいそう。あとであざ吉にそっと寄り添う',
  '長い物には巻かれよう。それとなくあざ吉を避けてしまう',
  '「激辛カレーで許してやるよ」積極的に加担する'
],
imgGraphic : 'img3.jpg',
　　},
{
  question : '「あざ子かわいいなぁ」友達の好きな子を好きになった。どうする？',
　　answer: [
'「恋は戦争！」自分を磨き努力する',
'「縁がなかった…」友達を気遣って諦める',
'「学生恋愛なんてすぐ終わる」現実を見る',
'「あいつ実はバッカター」ディープフェイクで噂を流す'
],
imgGraphic : 'img4.jpg',
　　},
{
  question : '「第三世界じゃマスクなんて誰もつけな…ゴホゴホ」マスクしない先生が感染した。どうする？',
　　answer: [
'「力を合わせて防ぎましょう」正論でマスク装着を促す',
'「先生が心配です」自分のマスクをわけてあげる',
'「みんな迷惑してるんですよ！」同調圧力で思い知らせる',
'「ギヒヒ。RTゲットだぜ」ガラケー使って撮影する'
],
imgGraphic : 'img5.jpg',
　　},
{
  question : '「君じゃウチの水族館はムリだろうね」就職説明会で圧迫された！どうする？',
　　answer: [
'「ご指摘の通りですが、末席に立てる人材に成長します」模範解答で説得する',
'「気持ちだけは負けません！」サービス精神をアピールする',
'「オフでも役に立ちますぜ」面接官に取り入る',
'「お前、寿司デートしてるだろ」弱みを握って裏口採用',
],
imgGraphic : 'img6.jpg',
　　},
{
  question : '「もうツライ死にたい…」フォロワーのあざ美が泣きついてきた。どうする？',
　　answer: [
'「どうやったら解決できるかな」男性的に解決策を探す',
'「わかるよ。ツライよね」女性的に共感する',
'「僕がついてる」ワンチャン狙ってゲス顔',
'「お手伝いしますよ」座間にある自宅に誘う'
],
imgGraphic : 'img7.jpg',
　　},
{
  question : '「あんた、ちゃんと勉強しているの！」やばいBBAがキレはじめた。どうする？',
　　answer: [
'「いい大学にいけるよう頑張るよ」母の期待する答えを返す',
'「心配かけてごめんなさい」ママの気持ちに寄り添う',
'「安全安心を目指します」中身のない答えで保護者をごまかす',
'「うるせぇBBA！」宝塚ボウガンを構える'
],
imgGraphic : 'img8.jpg',
　　},
{
  question : '「来週は出張だからずっと一緒だ」パパが怪しげな会話をしているぞ。どうする？',
　　answer: [
'「不倫なんて許せない！」ママに正直に話してしまう',
'「家族のことを考えて」ママには言わず説得する',
'「コネクテッドルームなんてどうでしょう」味方になってわいろを要求',
'「人をバラしたくなった」病んだので3階建ての自宅でバラバラに',
],
imgGraphic : 'img9.jpg',
　　},
];


//問題ボタンと質問の管理
const selectSetLength = selectSet.length; 
let selectSetIndex = 0;


const $button = document.getElementsByClassName('btn-black'); //なにやら、HTMLから引っ張ったものは＄マークをつけるらしい？
const buttonLength = $button.length;

//問題分と回答ボタン、イメージ画像の割り当て
const storySelect = function (){
  $edGraphicArea.style.display ='none'; //エンディング欄を非表示状態にする
  $tweetDivided.style.display ='none'; //ツイート欄を非表示状態にする

  $textArea.textContent = selectSet[selectSetIndex].question;　//入れ子「selectSet」のインデックス番号のquestion（質問）を引き出している
  $graphicArea.src = selectSet[selectSetIndex].imgGraphic; //入れ子「selectSet」のインデックス番号のimgGraphic（画像）を引き出している
  let buttonIndex = 0;
 while(buttonIndex < buttonLength){
  $button[buttonIndex].textContent = selectSet[selectSetIndex].answer[buttonIndex];　//ワイル文でボタンの設置数の限度まで、ボタンに入れ子「selectSet」のanswerのラベルを割り当てている　=以降は入れ子のアドレスを指定している
 buttonIndex++; //1つ表示するごとにボタンインデックスの数を加算する
 }
};
storySelect();


//ボタンクリック時のイベント処理
const clickEvent =　function() {
  selectSetIndex++;
if(selectSetIndex < selectSetLength){
//問題数があればこっち
storySelect();
} else {
//問題数がなければ終了 
  ending();
}
};


//エンディングデータ格納庫　グラフィック、タイトル、テキストの3つで1セット
const edSet = [
  {
    edImgGraphic : 'edimg1.jpg',
    edTitle : '診断結果：あなたはリーダーあざらしです',
    edText : 'あなたは強い正義感と高い向上心を持つヒーロータイプのあざらしです。<br>リーダーシップに優れ周囲からの信頼も厚いため、コミュニティの中心的な存在になる資質を持っていますが、多少堅苦しいところもあるようです。<br>母性豊かなママあざらしや実直な令和型あざらしと相性が良いでしょう'
},
  {
    edImgGraphic : 'edimg2.jpg',
    edTitle : '診断結果：あなたはママあざらしです',
    edText : 'あなたは母性的で優しい性格のあざらしです。<br>打算がなく誠実なあなたに好意を持つあざらしは多く、たくさんの友人と仲良くできる資質を持っています。<br>ただし、やや自己犠牲の傾向が強く、無理しすぎてしまうところが欠点です。<br>どんなあざらしとも仲良くする資質を持ちますが、特にあなたを導くリーダーあざらしや誠実な令和型あざらしと良好な関係を築けます'
},
  {
    edImgGraphic : 'edimg3.jpg',
    edTitle : '診断結果：あなたはスネ夫あざらしです',
    edText : 'あなたはとても利己的で自己愛に満ちたあざらしです。<br>臆病で他人や世間に不審を感じているものの、実は感受性豊かで他者の心の動きに敏感な長所を持っています。<br>長所を活かし、他者に取り入ることが得意なあなたなら、ごますり重視の組織で実力以上の地位を手にすることも可能です。<br>相性の良いあざらしは、利用しやすいDQNあざらしや取り入りやすいパワハラあざらしです'
  },
  {
    edImgGraphic : 'edimg4.jpg',
    edTitle : '診断結果：あなたはDQNあざらしです',
    edText : 'あなたは感情的で負けず嫌いなところのあるあざらしです。<br>暴力的で衝動的に判断する傾向が強く、他者への共感性も乏しいことから、何事も失敗しやすく疎まれがちです。<br>一人で生きていくのは難しいので、あなたを利用したいスネ夫あざらしなどと組み、智謀を得るところからはじめましょう'
},
  {
    edImgGraphic : 'edimg5.jpg',
    edTitle : '診断結果：あなたは令和型あざらしです',
    edText : 'あなたは柔和でありながら芯が強く、コミュ力にも長けている、令和教育ママ垂涎のあざらしです。<br>倫理観と優しさを併せ持ち共感性も豊かなので、苦手な相手とも良好な関係を築く力を持っています。<br>さらにストレス耐性も高いので日本国内で暮らしていくにはもっとも適したあざらしと言えるでしょう。<br>単独でも世を渡る能力を備えていますが、リーダーあざらしやママあざらし、受け流しやすいパワハラあざらしとも良い相性を持っています'
  },
  {
    edImgGraphic : 'edimg6.jpg',
    edTitle : '診断結果：あなたはチャラ男あざらしです',
    edText : 'あなたは要領の良さが魅力のあざらしです。<br>周囲からはお調子モノと評されがちですが、それはあなたが対人関係に器用だから。<br>本音と建て前を器用に使い分けるあなたなら、営業や合コン、マッチングアプリで大活躍間違いなしです。<br>特に言いくるめやすい思春期あざらしとの相性は抜群です'
},
  {
    edImgGraphic : 'edimg7.jpg',
    edTitle : '診断結果：あなたはパワハラあざらしです',
    edText : 'あなたは信じた道を突き進む、ある種の強さを持ったあざらしです。<br>努力家でもあり目標のためなら困難を厭わない面を持つ一方で、意にそぐわない存在に厳しく接してしまうことから、パワハラタイプのあざらしと言えるでしょう。<br>令和の世では生きにくい性格ですが、ストレス耐性の高い令和型あざらしとの相性は良いでしょう'
  },
  {
    edImgGraphic : 'edimg8.jpg',
    edTitle : '診断結果：あなたはいじわるあざらしです',
    edText : '「夫人の仁」という格言がピッタリのハマるあざらしです。<br>あなたは自分を優しいと思っていますが、その優しさは自分が安定的な立場にいる時だけの上っ面なものに過ぎません。<br>あなたはひとたび窮地に陥ると、途端に卑劣な行為に走ってしまう、きわめて人間的で俗世的なあざらしです。<br>相性の良いあざらしは、群れやすく共感を得やすい同系統のあざらしです。'
  },
  {
    edImgGraphic : 'edimg9.jpg',
    edTitle : '診断結果：あなたは思春期あざらしです',
    edText : 'あなたは好悪の感情が強く揺れやすい、思春期的なあざらしです。<br>感情安定性に欠けるため、好ましい存在に異常なほど熱をあげたり、嫌いな相手を激しく攻撃したりと極端なところが目立ちます。<br>もっとも、もしあなたが10代の思春期ならば、仕方ないのかもしれません。<br>相性の良いあざらしは、器用なチャラ男あざらしや憧れの対象となりやすいリーダーあざらしです。'
  },
  {
    edImgGraphic : 'edimg10.jpg',
    edTitle : '診断結果：あなたはサイコパスあざらしです',
    edText : 'あなたは自分が攻撃的で卑怯なことを自覚し、受け入れているあざらしです。<br>人望もなく友人も少ないタイプですが、あなた自身は対人関係など気にも止めていないでしょう。<br>善悪なんて所詮人間が決めたものです。思うがままに生きてこそ、あなたを全うできるでしょう。'
  },
  {
    edImgGraphic : 'edimg11.jpg',
    edTitle : '診断結果：あなたは平凡なあざらしです',
    edText :'あなたはごく平凡なあざらしです。<br>このゲームは同じテーマの問いかけを内容を変え繰り返し尋ねているものです。<br>しかし、あなたは本質的なこだわりを持っておらず、状況や当事者の立場など出来事の表面的な要素で判断するため、一貫した答えが出ていません。<br>もっとも、多くのあざらしはそんなものです。平凡なあざらしと言うほかないでしょう。'
  }
];




//エンディング画面の出力コード
function endingControl(edNumber){
  while ($allDivided.firstChild) { //診断ゲームエリア全体にタグがある限りループして削除
    $allDivided.removeChild($allDivided.firstChild);
  };
  const h3 = document.createElement('h3');　//判定結果タイトルの表示
  h3.setAttribute('align', 'center');
  h3.innerText = edSet[edNumber].edTitle;
  $resultDivided.appendChild(h3);

  $edGraphicArea.style.display ='inline-block'; //冒頭で非表示にしていたエンディング欄をインラインブロック要素で表示する
  $edGraphicArea.src = edSet[edNumber].edImgGraphic;

  $tweetDivided.style.display ='inline-block'; //ツイートエリアの表示

  const p = document.createElement('p');　//判定結果の詳細テキスト
  p.setAttribute('align', 'center');
  $resultDivided.appendChild(p);
  p.innerHTML = edSet[edNumber].edText;
}



//storySelectで獲得したステータス値に基づいたエンディング判定
function ending (){
  if (moral>=7 && rage <2 && cowardly <2 ){ //モラル重視型あざらしの判定
    var edNumber = 0;
    endingControl(edNumber);
  } 
  else if (love>=7 && rage <2 && cowardly <2){ //愛重視型あざらしの判定
    var edNumber = 1;
    endingControl(edNumber);
  }
  else if (cowardly>=7 && moral <2 && love <2){　//卑劣重視型あざらしの判定
    var edNumber = 2;
    endingControl(edNumber);
  }
  else if (rage>=7 && moral <2 && love <2){　//暴力重視型あざらしの判定
    var edNumber = 3;
    endingControl(edNumber);
  }
  else if (moral>2 && love>3, cowardly<2 && rage<1){　//模範解答型あざらしの判定
    var edNumber = 4;
    endingControl(edNumber);
  }
  else if (moral>2 && cowardly>3, rage<2 && love<2){　//チャラ型あざらしの判定
    var edNumber = 5;
    endingControl(edNumber);
  }
  else if (moral>2 && rage>3, cowardly<2 && love<2){　//パワハラ重視型あざらしの判定
    var edNumber = 6;
    endingControl(edNumber);
  }
  else if (love>2 && cowardly>3,　rage<2 && moral<2){　//いじわる型あざらしの判定
    var edNumber = 7;
    endingControl(edNumber);
  }
  else if (love>3 && rage>2,　cowardly<2 && moral<2){　//思春期型あざらしの判定
    var edNumber = 8;
    endingControl(edNumber);
  } 
  else if (cowardly>2 && rage>3,　moral<2 && love<2){　//サイコパス型あざらしの判定
    var edNumber = 9;
    endingControl(edNumber);
  } else {
    var edNumber = 10;　//状況回答あざらしの判定
    endingControl(edNumber);
  }
};




//クリックイベントの設定　→　addEventListenerからクリックイベントを引っ張り、storySelectの問題文に割り当てている。フラグ判定もここで加算している
$button[0].addEventListener('click',(e) => {
  moral++; //モラル値を加算
  clickEvent(e);
  }
);

$button[1].addEventListener('click',(e) => {
  love++; //愛情値を加算
  clickEvent(e);
  }
);

$button[2].addEventListener('click',(e) => {
  clickEvent(e);
  cowardly++; //卑劣値を加算
  }
);

$button[3].addEventListener('click',(e) => {
  clickEvent(e);
  rage++; //憎悪値を加算
  }
);




//ツイートエリアの作成


let anchor = document.createElement('a');
let hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +
encodeURIComponent('あざらし診断') +
'&ref_src=twsrc%5Etfw';

anchor.setAttribute('href',hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text', '診断結果');
anchor.innerText = 'Tweet #あざらし診断';

$tweetDivided.appendChild(anchor);