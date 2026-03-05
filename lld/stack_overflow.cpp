#include <iostream>
using namespace std;
#include <vector> 
// will create a user 
class User {
    public : 
    int id ;
    string name ;
    // construtor 
    User(int id , string name) {
        this-> id = id ;
        this-> name = name ;

    }
} ;
// vote 
class Vote {
    public :
    int value ;
    User* user ;
    Vote(int value , User* user) {
        this->value = value ;
        this->user = user ;

    }

} ;
// comment on post 
class Comment {
    public :
    int id ;
    string text ;
    User* user ; 
    Comment(int id ,string text ,User*user) {
        this->id = id ;
        this-> text = text ;
        this -> user = user ;

    }

};
// base post class 
class Post {
    public : 
    int id ;
    string content ;
    User* author ;
    Post(int id , string content , User*auhtor) {
        this-> id = id ;
        this-> content= content;
        this -> author ;


    }
vector<Comment> comment ;
vector<Vote> vote ;
// abb fucntion likthe jiske ki voe and comments add jo
void addComment( Comment c ){
    comment.push_back(c) ;

} ;
void addVote( Vote v) {
    vote.push_back(v) ;
} ;
int getScore() {
    int score = 0 ;
    for(auto v : vote) {
        score += v.value ;

    } 
    return score ;
} ;
} ;
// answer class 
class Answer : public Post {
    public:
    bool accepted ;
    Answer(int id , string content , User* author):Post(id,content , author){
        accepted = false ;

    }
    void acceptAnswer(){
        accepted = true ;
    };
};
// question class 
class Question :public Post {
    public : 
    vector<Answer*> answers ;
    vector<string> tags ;
    // constuctor 
    Question( int id , string content , User* author):Post(id , content , author){} ;
    void addAnswer(Answer * answer){
        answers.push_back(answer) ;


    } ;
    void addTag(string tag) {
        tags.push_back(tag) ;
    } ;
};
// factory desughn patter
class PostFactory{
    public:
    static Question* createQuestion(int id , string text , User* user){
        return new Question(id , text , user) ;


    }
    static Answer* createAnswer(int id , string text , User*user) {
        return new Answer(id , text , user) ;
    } ;
}; 
int main () {
    // users 
    User u1(1, "rujal") ;
    User u2(2 , "gauri") ;
    // lets creatye questions now 
    Question* q1 = PostFactory:: createQuestion(1, " am i selented for this role", &u1);
    q1->addTag("life") ;
   Answer* a1 = PostFactory:: createAnswer(
    2 ,
    "MAY BE MAY BE NOT" ,
    &u2 
   );
   // vote 
   a1->addVote(Vote(1,&u1));

   q1-> addAnswer(a1) ;
   cout<< "Answer score " << a1-> getScore()<<endl;
   return 0 ;

}