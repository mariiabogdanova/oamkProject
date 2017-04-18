

function getpollHeader()
{
var questionsForPoll='poll_title';

$('#question1').html(777777);
var numberofoptions=5;
var content ="";
for(var count=0;count<numberofoptions;count++){

content+='<input type="radio" name="answer" value="A">Answer B <br />';

}
$('#all_options').html(content);


pollResults();
}

function pollResults()
{
  var numberofresults;
 

$('#pollAnalyzis').html(1224);


}