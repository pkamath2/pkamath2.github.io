Pts.namespace(window); 

updatestate = (rule_num, num_squares, initializer) => {
    //1. Initialize first row
    cell_state = new Array(num_squares*num_squares).fill(false);
    
    if(initializer && initializer == 'RBC'){
        //Randomizing initial state
        for(j=1;j<=299;j++){
            cell_state[Math.floor(Math.random()*1000*j)] = true;
        }
    }else{
        cell_state[num_squares/2] = true;
    }
    
    //2. Run Rules
    for(i=0;i<num_squares*num_squares;i++){
        if(!cell_state[i] && i>num_squares-1){
            i_prev = i-(num_squares+1);
            i_curr = i-(num_squares);
            i_next = i-(num_squares-1);
            cell_state[i] = rule(rule_num, cell_state[i_prev], cell_state[i_curr], cell_state[i_next]);
        }
    }
    return cell_state;
}

generate = () => {
    $("#ca-rule").html("");
    createSpace($("#ca-dd-sel").val().split(" ")[1], $("#ca-start-dd-sel").val());
}

addrulesdd = () => {
    var rules = $("#ca-dd-sel");
    for(i=1;i<256;i++){
        opt = "<option>Rule "+i+"</option>";
        rules.append(opt);
    }   
}

createSpace = (rule_num, initializer) => {
    var space = new CanvasSpace("#ca-rule").setup({retina: true,bgcolor: 'floralwhite',resize:false});
    var form = space.getForm();
    var num_squares = 300;
    var cells = [];
    var cell_state = [];
    space.add({
        start: () => {
            cells = Create.gridPts(space.innerBound, num_squares, num_squares);
            cell_state = updatestate(rule_num, num_squares, initializer);
        },
        animate: (time, ftime) => {
            cells.forEach((c,i) => {
                form.strokeOnly("#123", 0.1).fill(cell_state[i]?"#4e5054":"#fff").square(c, 2); 
            });
        }
    });
    space.playOnce(0);
}

rule = (rule_num, p, q, r) => {
    var fill = false;
    if(rule_num==1) fill = !(p | q | r);
    if(rule_num==2) fill = !(p) & !(q) & r;
    if(rule_num==3) fill = !(p | q);
    if(rule_num==4) fill = !(p | r) & q;
    if(rule_num==5) fill = !(p | r);
    if(rule_num==6) fill = !(p) | (q ^ r);
    if(rule_num==7) fill = !(p | q & r);
    if(rule_num==8) fill = !(p) & q & r;
    if(rule_num==9) fill = !(p | (q ^ r));
    if(rule_num==10) fill = !(p) & r;
    
    if(rule_num==11) fill = p ^ (p | !q | r);
    if(rule_num==12) fill = (p & q) ^ q;
    if(rule_num==13) fill = p ^ (p | q | !r);
    if(rule_num==14) fill = p ^ (p | q | r);
    if(rule_num==15) fill = !(p);
    if(rule_num==16) fill = p &  !q & !r;
    if(rule_num==17) fill = !(q | r);
    if(rule_num==18) fill = (p ^ q ^ r) & !q;
    if(rule_num==19) fill = !((p & r) | q);
    if(rule_num==20) fill = (p ^ q) & !r;

    if(rule_num==21) fill = !((p & q) | r);
    if(rule_num==22) fill = p ^ (p & q & r) ^ q ^ r;
    if(rule_num==23) fill = p ^ ((p ^ (!q)) | (q ^ r));
    if(rule_num==24) fill = (p ^ q) & (p^r);
    if(rule_num==25) fill = (p & q & r) ^ q ^ !r;
    if(rule_num==26) fill = p ^ ((p & q) | r);
    if(rule_num==27) fill = p ^ ((p ^ !q) | r);
    if(rule_num==28) fill = p ^ ((p & r) | q);
    if(rule_num==29) fill = p ^ (p ^ !r) | q;
    if(rule_num==30) fill = p ^ (q | r);

    if(rule_num==31) fill = !(p & (q | r));
    if(rule_num==32) fill = p & !q & r;
    if(rule_num==33) fill = !((p ^ q ^ r) | q);
    if(rule_num==34) fill = !q & r;
    if(rule_num==35) fill = ((!p) | q | r) ^ q;
    if(rule_num==36) fill = (p ^ q) & ( q ^ r);
    if(rule_num==37) fill = p ^ (p & q & r) ^ !r;
    if(rule_num==38) fill = ((p & q) | r) ^ q;
    if(rule_num==39) fill = ((p ^ (!q)) | r) ^ q;
    if(rule_num==40) fill = (p ^ q) & r;

    if(rule_num==41) fill = !((p & q) | (p ^ q ^ r));
    if(rule_num==42) fill = (p & q & r) ^ r;
    if(rule_num==43) fill = p ^ ((p ^ r) | ( p ^ (!q)));
    if(rule_num==44) fill = (p & (q | r)) ^ q;
    if(rule_num==45) fill = p ^ (q | !r);
    if(rule_num==46) fill = (p & q) ^ (q | r);
    if(rule_num==47) fill = !p | (!q & r);
    if(rule_num==48) fill = p & !q;
    if(rule_num==49) fill = (p | q | !r) ^ q;
    if(rule_num==50) fill = (p | q | r) ^ q;

    if(rule_num==51) fill = !q;
    if(rule_num==52) fill = (p | (q & r)) ^ q;
    if(rule_num==53) fill = (p | (q ^ !r)) ^ q;
    if(rule_num==54) fill = (p | r) ^ q;
    if(rule_num==55) fill = !((p | r) & q);
    if(rule_num==56) fill = p ^ ((p | r) & q);
    if(rule_num==57) fill = (p | !r) ^q;
    if(rule_num==58) fill = (p | (q ^ r)) ^ q;
    if(rule_num==59) fill = (!p & r) | !q;
    if(rule_num==60) fill = p ^ q;

    if(rule_num==61) fill = p ^ (p | q| r) ^ !q;
    if(rule_num==62) fill = (p & q) ^ (p | q | r);
    if(rule_num==63) fill = !(p & q);
    if(rule_num==64) fill = p & q & !r;
    if(rule_num==65) fill = !((p ^ q) | r);
    if(rule_num==66) fill = (p ^ r) & (q ^ r);
    if(rule_num==67) fill = p ^ (p | q | r) ^ !q;
    if(rule_num==68) fill = q & !r;
    if(rule_num==69) fill = (!p | q | r) ^ r;
    if(rule_num==70) fill = ((p & r) | q) ^ r;

    if(rule_num==71) fill = ((p ^ !r) | q) ^ r;
    if(rule_num==72) fill = (p & q) ^ (q & r);
    if(rule_num==73) fill = !((p & r) | (p ^ q ^ r));
    if(rule_num==74) fill = (p & (q | r)) ^ r;
    if(rule_num==75) fill = p ^ (!q | r);
    if(rule_num==76) fill = (p & q & r) ^ q;
    if(rule_num==77) fill = p ^ ((p ^ q) | (p ^ !r));
    if(rule_num==78) fill = p ^ ((p ^ q) | r);
    if(rule_num==79) fill = !p | (q & !r);
    if(rule_num==80) fill = p & !r;

    if(rule_num==81) fill = (p | !q | r) ^ r;
    if(rule_num==82) fill = (p | (q & r) ^ r);
    if(rule_num==83) fill = (p | (q ^ !r) ^ r);
    if(rule_num==84) fill = (p | q | r) ^ r;
    if(rule_num==85) fill = !r;
    if(rule_num==86) fill = (p | q) ^ r;
    if(rule_num==87) fill = !((p | q) & r);
    if(rule_num==88) fill = p ^ ((p | q) & r);
    if(rule_num==89) fill = (p | !q) ^ r;
    if(rule_num==90) fill = p ^ r;

    if(rule_num==91) fill = p ^ (!(p | q | r)) ^ r;
    if(rule_num==92) fill = (p | (q ^ r)) ^ r;
    if(rule_num==93) fill = !((p | !q) & r);
    if(rule_num==94) fill = (p & r) ^ (p | q | r);
    if(rule_num==95) fill = !(p & r);
    if(rule_num==96) fill = p & (q ^ r);
    if(rule_num==97) fill = !((p ^ q ^ r) | (q & r));
    if(rule_num==98) fill = ((p | r) & q) ^ r;
    if(rule_num==99) fill = (!p | r) ^ q;
    if(rule_num==100) fill = ((p | q) & r) ^ q;

    if(rule_num==101) fill = p ^ (p | q) ^ !r;
    if(rule_num==102) fill = q ^ r;
    if(rule_num==103) fill = (!(p | q | r)) ^ q ^ r;
    if(rule_num==104) fill = p ^ (p | q | r) ^ q ^ r;
    if(rule_num==105) fill = (p ^ q ^ !r);
    if(rule_num==106) fill = (p & q) ^ r;
    if(rule_num==107) fill = p ^ (p | q | !r) ^ q ^ r;
    if(rule_num==108) fill = (p & r) ^ q;
    if(rule_num==109) fill = p ^ (p | !q | r) ^ q ^ r;
    if(rule_num==110) fill = (!p & q & r) ^ q ^ r;

    if(rule_num==111) fill = !p | (q ^ r);
    if(rule_num==112) fill = p ^ (p & q & r);
    if(rule_num==113) fill = p ^ (!((p ^ q) | (p ^ r)));
    if(rule_num==114) fill = ((p ^ q) | r) ^ q;
    if(rule_num==115) fill = (p & !r) | !q;
    if(rule_num==116) fill = (p | q) ^ (q & r);
    if(rule_num==117) fill = (p & !q) | !r;
    if(rule_num==118) fill = (p | q | r) ^ (q & r);
    if(rule_num==119) fill = !(q | r);
    if(rule_num==120) fill = !((p ^ q ^ r) & q);

    if(rule_num==121) fill = p ^ (!(p) | q | r) ^ q ^ r;
    if(rule_num==122) fill = p ^ (p & !q & r) ^ q ^ r;
    if(rule_num==123) fill = !((p ^ q ^ r) & q);
    if(rule_num==124) fill = p ^ (p & q & !r) ^ q;
    if(rule_num==125) fill = (p ^ q) | !r;
    if(rule_num==126) fill = (p ^ q) | (p ^ r);
    if(rule_num==127) fill = !(p & q & r);
    if(rule_num==128) fill = p & q & r;
    if(rule_num==129) fill = !((p ^ q) | (p ^ r));
    if(rule_num==130) fill = (p ^ q ^ r) & r;

    if(rule_num==131) fill = p ^ (p & q & !r) ^ !q;
    if(rule_num==132) fill = (p ^ q ^ r) & q;
    if(rule_num==133) fill = p ^ (p & !q & r) ^ !r;
    if(rule_num==134) fill = (p & (q | r)) ^ q ^ r;
    if(rule_num==135) fill = !p ^ (q & r);
    if(rule_num==136) fill = q & r;
    if(rule_num==137) fill = (!(p) | q | r) ^ q ^ r;
    if(rule_num==138) fill = (p & !q & r) ^ r;
    if(rule_num==139) fill = !((p | q) ^ (q & r));
    if(rule_num==140) fill = (!p | r) & q;  

    if(rule_num==141) fill = p ^ ((p | q) | !r);
    if(rule_num==142) fill = p ^ ((p ^q) | (p ^ r));
    if(rule_num==143) fill = !p | (q & r);
    if(rule_num==144) fill = p & (p ^ q ^ r);
    if(rule_num==145) fill = (!p & q & r) ^ q ^ !r;
    if(rule_num==146) fill = p ^ ((p | r) & q) ^ r;
    if(rule_num==147) fill = (p & r) ^ !q;
    if(rule_num==148) fill = p ^ ((p | q) & r) ^ q;
    if(rule_num==149) fill = (p & q) ^ !r;
    if(rule_num==150) fill = p ^ q ^ r;  

    if(rule_num==151) fill = p ^ (!(p | q | r)) ^ q ^ r;
    if(rule_num==152) fill = (p | q | r) ^ q ^ r;
    if(rule_num==153) fill = q ^ !r;
    if(rule_num==154) fill = p ^ (p & q) ^ r;
    if(rule_num==155) fill = (p | q | !r) ^ q ^ r;
    if(rule_num==156) fill = p ^ (p & r) ^ q;
    if(rule_num==157) fill = (p | !q | r) ^ q ^ r;
    if(rule_num==158) fill = (p ^ q ^ r) | (q & r);
    if(rule_num==159) fill = !(p & (q ^ r));
    if(rule_num==160) fill = p & r; 
    
    if(rule_num==161) fill = p ^ (p | !q | r) ^ r;
    if(rule_num==162) fill = (p | !q) & r;
    if(rule_num==163) fill = (!p | (q ^ r)) ^ q;
    if(rule_num==164) fill = p ^ (p | q | r) ^ r;
    if(rule_num==165) fill = p ^ !r;
    if(rule_num==166) fill = (p & q) ^ q ^ r;
    if(rule_num==167) fill = p ^ (p | q | !r) ^ r;
    if(rule_num==168) fill = (p | q) & r;
    if(rule_num==169) fill = (!(p | q) ^ r);
    if(rule_num==170) fill = r;  

    if(rule_num==171) fill = (!(p | q) | r);
    if(rule_num==172) fill = (p & (q ^ r)) ^ q;
    if(rule_num==173) fill = (p ^ !r) | (q & r);
    if(rule_num==174) fill = ((p & q) ^ q) | r;
    if(rule_num==175) fill = !p | r;
    if(rule_num==176) fill = p & (!q | r);
    if(rule_num==177) fill = p ^ !((p ^ q) | r);
    if(rule_num==178) fill = ((p ^ q) | (p ^ r)) ^ q;
    if(rule_num==179) fill = (p & r) | !q;
    if(rule_num==180) fill = p ^ q ^ (q & r);  

    if(rule_num==181) fill = p ^ (!p | q | r) ^ r;
    if(rule_num==182) fill = (p & r) | (p ^ q ^ r);
    if(rule_num==183) fill = (p ^ q ^ r) | !q;
    if(rule_num==184) fill = p ^ (p & q) ^ (q & r);
    if(rule_num==185) fill = (p & r) | (q ^ !r);
    if(rule_num==186) fill = (p & !q) | r;
    if(rule_num==187) fill = !q | r;
    if(rule_num==188) fill = p ^ (p | q | r) ^ q;
    if(rule_num==189) fill = (p ^ q) | (p ^ !r);
    if(rule_num==190) fill = (p ^ q) | r;  

    if(rule_num==191) fill = !p | !q | r;
    if(rule_num==192) fill = p & q;
    if(rule_num==193) fill = p ^ (p | q | !r) ^ q;
    if(rule_num==194) fill = p ^ (p | q | r) ^ q;
    if(rule_num==195) fill = p ^ !q;
    if(rule_num==196) fill = (p | !r) & q;
    if(rule_num==197) fill = (!(p | (q ^ r))) ^ q;
    if(rule_num==198) fill = (p & r) ^ q ^ r;
    if(rule_num==199) fill = p ^ (p | !q | r) ^ q;
    if(rule_num==200) fill = (p | r) & q;  

    if(rule_num==201) fill = (!(p | r)) ^ q;
    if(rule_num==202) fill = (p & (q ^ r)) ^ r;
    if(rule_num==203) fill = (p ^ !q) | (q & r);
    if(rule_num==204) fill = q;
    if(rule_num==205) fill = (!(p | r)) | q;
    if(rule_num==206) fill = (!p & r) | q;
    if(rule_num==207) fill = !(p & !q);
    if(rule_num==208) fill = p & (q | !r);
    if(rule_num==209) fill = !((p & q) ^ (q | r));
    if(rule_num==210) fill = p ^ (q & r) ^ r;

    if(rule_num==211) fill = p ^ (!p | q | r) ^ q;
    if(rule_num==212) fill = ((p ^ q) | (p ^ r)) ^ r;
    if(rule_num==213) fill = (p & q) | !r;
    if(rule_num==214) fill = (p & q) | (p ^ q ^ r);
    if(rule_num==215) fill = !((p ^ q) & r);
    if(rule_num==216) fill = p ^ ((p ^ q) & r);
    if(rule_num==217) fill = (p & q) | (q ^ !r);
    if(rule_num==218) fill = p ^ ( p & q & r) ^ r;
    if(rule_num==219) fill = (p ^ r) | (p ^ !q);
    if(rule_num==220) fill = (p & !r) | q;

    if(rule_num==221) fill = q | !r;
    if(rule_num==222) fill = (p ^ q ^ r) | q;
    if(rule_num==223) fill = !(p & !q & r);
    if(rule_num==224) fill = p & (q | r);
    if(rule_num==225) fill = p ^ !(q | r);
    if(rule_num==226) fill = (p & q) ^ (q & r) ^ r;
    if(rule_num==227) fill = (p & r) | (p ^ !q);
    if(rule_num==228) fill = ((p ^ q) & r) ^ q;
    if(rule_num==229) fill = (p ^ q) | ((p | q) & r);
    if(rule_num==230) fill = (p & q & r) ^ q ^ r;

    if(rule_num==231) fill = (p ^ !q) | (q ^ r);
    if(rule_num==232) fill = (p & q) | ((p | q) & r);
    if(rule_num==233) fill = p ^ (p & q & r) ^ q ^ !r;
    if(rule_num==234) fill = (p & q) | r;
    if(rule_num==235) fill = (p ^ !q) | r;
    if(rule_num==236) fill = (p & r) | q;
    if(rule_num==237) fill = (p ^ !r) | q;
    if(rule_num==238) fill = q | r;
    if(rule_num==239) fill = !p | q | r;
    if(rule_num==240) fill = p;

    if(rule_num==241) fill = p | (!(q | r));
    if(rule_num==242) fill = p | (!q & r);
    if(rule_num==243) fill = p | !q;
    if(rule_num==244) fill = p | (q & !r);
    if(rule_num==245) fill = p | !r;
    if(rule_num==246) fill = p | (q ^ r);
    if(rule_num==247) fill = p | !q | !r;
    if(rule_num==248) fill = p | (q & r);
    if(rule_num==249) fill = p | (q ^ !r);
    if(rule_num==250) fill = p | r;  

    if(rule_num==251) fill = p | !q | r;
    if(rule_num==252) fill = p | q;
    if(rule_num==253) fill = p | q | !r;
    if(rule_num==254) fill = p | q | r;
    if(rule_num==255) fill = true;

    return fill;
}