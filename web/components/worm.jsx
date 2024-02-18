import React, { Component } from 'react';

class GridWormCanvas extends Component {
    componentDidMount() {
        this.setupCanvas();
        requestAnimationFrame(this.doAnimationLoop);
    }

    setupCanvas = () => {
        // Setup code here, similar to your getBrowserWindowSize and initial setup
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Initialize your Painter class here, using the canvas width and height
        // You might need to adjust your Painter and GridWorm classes to accept a context (ctx) directly
        this.painter = new Painter(canvas.width, canvas.height, ctx); // Assuming Painter class is adapted to accept ctx

        // Set up resize listener
        window.addEventListener('resize', this.onWindowResize);
    }

    onWindowResize = () => {
        // Handle resizing
        const canvas = this.refs.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.painter.refreshScreenSize(canvas.height, canvas.width);
    }

    doAnimationLoop = (timestamp) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');

        // Update and draw your canvas here
        this.updateCanvas(ctx, canvas.width, canvas.height);
        this.painter.update(100); // You may need to adjust how deltaTime is handled
        this.painter.draw(ctx);

        requestAnimationFrame(this.doAnimationLoop);
    }

    updateCanvas = (ctx, width, height) => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    render() {
        return (
            <canvas ref="canvas" id="wormcanvas"/>
        );
    }
}

class GridWorm
{
    constructor(point,interval,pointsList,screenWidth,screenHeight)
    {
        this.radius  = 8
        this.xCoord  = point.x;
        this.yCoord  = point.y;
        this.interval= interval;
        this.color = this.getColor(1,true);//get random color object
        this.mainColor = this.color.color;//color of the head and body of the girdworm
        this.mainColorIndex = this.color.index;
        this.nColor = this.getColor(1,true);//get another random color object
        this.arrowHeadColor = this.nColor.color;//color of the arrrow points at the head of the gridworm
        this.arrowHeadColorIndex = this.nColor.index;
        this.pointsList = pointsList;
        this.screenWidth = screenWidth;
        this.screenHeight= screenHeight;
        this.speed   = 1;//the magnitude of the velocity
        this.velocity= this.getVelocity();
        this.junctionMemory = [{point:point,velocity:this.velocity}];//memory of each junction visited(helps to construct the worm)
        //the maximum number of junctions a gridworm can keep in memory(this determines how long the gridworm will be)
        this.junctionMemoryLength = 48;
    }
    getColor(opacity,isRandom = true,index = 0)
    {
        if(opacity < 0 || opacity > 1 || opacity === null || isNaN(opacity))//if opacity is incorrect
        {
            opacity = 1;
        }
        var colors =
            [
                `rgba(151,8,66,${opacity})`,`rgba(17,144,170,${opacity})`
            ];
        if(isRandom)
        {
            let index = Math.floor(this.getRandomNumber(0,colors.length));
            let color = colors[index];
            return {color:color,index:index};
        }
        else//if specific
        {
            if(index >=0 && index < colors.length)
            {
                return colors[index];
            }
            return colors[0];
        }
    }
    getVelocity()
    {
        let isVertical = this.velocity && Math.abs(this.velocity.x) < Math.abs(this.velocity.y);
        let x,y;
        //flip a coin to decide if gridworm moves vertically or horizontally
        if(!isVertical)//if gridworm moves vertically
        {
            x = 0;//no horizontal movement
            y = Math.random() > 0.5? -this.speed: this.speed;//flip a coin to decide if gridworm moves upwards or downwards
        }
        else//if gridworm moves horizontally
        {
            x = Math.random() > 0.5? -this.speed: this.speed;//flip a coin to decide if gridworm moves left or right
            y = 0;//no vertical movement
        }
        return {x:x, y:y};
    }
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     * @param  {number} min The lesser of the two numbers.
     * @param  {number} max The greater of the two numbers.
     * @return {number} A random number between min (inclusive) and max (exclusive)
     */
    getRandomNumber(min, max)
    {
        return Math.random() * (max - min) + min;
    }
    draw(ctx)
    {
        //draw the line connecting head to body
        ctx.strokeStyle = this.getColor(1.0, false, this.mainColorIndex);
        ctx.lineWidth = this.radius;
        ctx.beginPath();

        let isVertical = Math.abs(this.velocity.x) < Math.abs(this.velocity.y)
        let xRounded = !isVertical ? this.xCoord : Math.round(this.xCoord / 40.0) * 40.0;
        let yRounded = !isVertical ? Math.round(this.yCoord / 40.0) * 40.0 : this.yCoord;
        ctx.moveTo(xRounded, yRounded);
        //draw a line to link all the visited junctions in the gridworm's memory(not RAM)
        for(let i = 0; i < this.junctionMemory.length; i++)
        {   //starting from the most recent to the least recent(LIFO)[NB: more like a stack data structure]
            let junction = this.junctionMemory[this.junctionMemory.length -(i+1)];
            ctx.lineTo(Math.round(junction.point.x), Math.round(junction.point.y));
        }
        ctx.stroke();
        ctx.closePath();
    }
    update(deltaTime)
    {
        this.junctionMemoryLength = this.junctionMemoryLength < 1? 1: this.junctionMemoryLength;
        //keep the gridworm moving in its current direction
        this.xCoord += this.velocity.x;//if gridworm is going left or right, keep it going
        this.yCoord += this.velocity.y;//if gridworm is going up or down, keep it going
        if(this.xCoord <= this.interval)//if gridworm reaches the leftmost point
        {
            this.xCoord = this.interval;
            this.velocity.x  = -this.velocity.x;//move right
            this.xCoord += this.velocity.x * 3;//nudge it a bit away from the edge
        }
        if(this.xCoord >= this.screenWidth - this.interval)//if gridworm reaches the rightmost point
        {
            this.xCoord = this.junctionMemory[this.junctionMemory.length-1].point.x;
            this.velocity.x  = -this.velocity.x;//move left
            this.xCoord += this.velocity.x * 3;//nudge it a bit away from the edge
        }
        if(this.yCoord <= this.interval)//if gridworm reaches the topmost most point
        {
            this.yCoord  = this.interval;
            this.velocity.y  = -this.velocity.y; //move down
            this.yCoord  += this.velocity.y * 3;//nudge it a bit away from the edge
        }
        if(this.yCoord >= this.screenHeight - this.interval)//if gridworm reaches the lowest point)
        {
            this.yCoord  = this.junctionMemory[this.junctionMemory.length-1].point.y;
            this.velocity.y  = -this.velocity.y;//move up
            this.yCoord  += this.velocity.y * 4;//nudge it a bit away from the edge
        }
        let currentCoord    = {x:this.xCoord,y:this.yCoord};
        let latestJunction  = this.getJunctionReached(currentCoord);
        if(latestJunction !== currentCoord)
        {
            let originalVelocity = this.velocity;
            let newVelocity = Math.random() < 0.62 ? originalVelocity : this.getVelocity();//flip a coin to decide to move up and down or right and left
            if(originalVelocity.y === 0 )//if gridworm is moving horizontally
            {
                this.velocity = newVelocity;
                if(newVelocity.y === 0 && newVelocity.x === -originalVelocity.x )//if it continues the horizontal movement in the opposite direction
                {
                    //don't add the new junction to the memory queue
                }
                else
                {
                    let memory = {point:latestJunction,velocity:this.velocity};
                    if(!this.isInMemory(memory))
                    {
                        this.junctionMemory.push(memory);//add new memory to the queue
                    }
                    //this.junctionMemory.push({point:latestJunction,velocity:this.velocity});//add new memory to the queue
                }
                //nudge it a bit away from the junction
                this.xCoord += this.velocity.x * 3; //not complete yet. Don't make it too much or too little.
            }
            else //if gridworm is moving vertically
            {
                this.velocity = newVelocity;
                if(newVelocity.x === 0 && newVelocity.y === -originalVelocity.y )//if it continues the verticalal movement in the opposite direction
                {
                    //don't add the new junction to the memory queue
                }
                else
                {
                    let memory = {point:latestJunction,velocity:this.velocity};
                    if(!this.isInMemory(memory))
                    {
                        this.junctionMemory.push(memory);//add new memory to the queue
                    }
                }
                //nudge it a bit away from the junction
                this.yCoord += this.velocity.y * 3; //not complete yet. Don't make it too much or too little.
            }
        }
        if(this.junctionMemory.length > this.junctionMemoryLength)//if memory is too long
        {
            this.junctionMemory.shift();//remove the first memory
        }
    }
    isInMemory(memory)//check if a junction is in memory
    {
        this.junctionMemory.some(function(mem)
        {
            if(mem.point === memory.point)
            {
                return true;//junction is in memory
            }
            return mem.point === memory.point;
        });
        return false;//junction is NOT in memory
    }
    getJunctionReached(currentCoord)
    {
        for(let i = 0; i < this.pointsList.length; i++)
        {
            let point = this.pointsList[i];
            //if point(junction) is too far away, ignore it
            if(Math.abs(currentCoord.x - point.x) > (2 * this.interval) || Math.abs(currentCoord.y - point.y) > (2 *this.interval) )
            {
                continue;
            }
            let distance = this.getDistance(currentCoord,point);
            if(distance <= (this.radius))//if gridworm head is close enough to a junction
            {
                return point;
            }
        }
        return currentCoord;
    }
    getDistance(p1,p2)//the distance between two points, p1 and p2
    {
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        return distance;
    }


    /**
     * Let node correspond to window resizing.
     * @param  {number} screenHeight The height of the screen.
     * @param  {number} screenWidth  The width of the screen.
     * @param  {number} dy           The percentage change in browser window height
     * @param  {number} dx           The percentage change in browser window width  .
     */
    refreshScreenSize(screenHeight,screenWidth,dx,dy,points)
    {

    }
}

//sets up and controls all points and gridworms on the canvas
class Painter
{
    constructor(screenWidth,screenHeight)
    {
        this.screenWidth    = screenWidth;
        this.screenHeight   = screenHeight;
        this.interval       = 40;//interval from one point to the next
        this.points         = this.createPoints(); //coordinates of the vertices of all squares when the canvas is partitioned
        this.gridWorms      = this.createGridWorms();
        document.addEventListener('click',(event)=>//when user clicks on the canvas
        {
            this.points     = this.createPoints();
            this.gridWorms  = this.createGridWorms();//spawn new gridworms
        });
    }
    createGridWorms()
    {
        let gridworms = [],
            numOfGridWorms = 30;
        for(var i = 0; i < numOfGridWorms; i++)
        {
            let point = this.points[Math.floor(this.getRandomNumber(0,this.points.length-1))];//randomly select a point
            gridworms.push(new GridWorm(point,this.interval,this.points,this.screenWidth,this.screenHeight));
        }
        return gridworms;
    }
    createPoints()//divide the canvas into squares
    {
        let points = [],
            interval = this.interval;//interval from one point to the next
        for(var y = interval; y < this.screenHeight; y+=interval)//get all points in the grid, starting from the top to the bottom
        {
            if(y+interval > this.screenHeight)//if the next point is beyond the right edge of the canvas
            {
                continue; //skip
            }
            for(var x = interval; x < this.screenWidth; x+=interval)//all the while, getting all the horizontal points at each level
            {
                if(x+interval > this.screenWidth)//if the next point is beyond the bottom edge of the canvas
                {
                    continue; //skip
                }
                points.push({x:x,y:y});
            }
        }
        return points;
    }
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     * @param  {number} min The lesser of the two numbers.
     * @param  {number} max The greater of the two numbers.
     * @return {number} A random number between min (inclusive) and max (exclusive)
     */
    getRandomNumber(min, max)
    {
        return Math.random() * (max - min) + min;
    }
    /**
     * Let canvas respond to window resizing.
     * @param  {number} screenHeight The height of the screen.
     * @param  {number} screenWidth  The width of the screen.
     */
    refreshScreenSize(screenHeight,screenWidth)
    {
        if(this.screenHeight !== screenHeight || this.screenWidth !== screenWidth)//if the screen size has changed
        {
            this.screenHeight   = screenHeight;
            this.screenWidth    = screenWidth;
            this.points         = this.createPoints(); //coordinates of the vertices of all squares when the canvas is partitioned
            this.gridWorms      = this.createGridWorms();
        }
    }
    update(deltaTime)
    {
        this.gridWorms.forEach(function(gridworm)
        {
            gridworm.update(deltaTime);
        });
    }
    draw(ctx)
    {
        /*
        for(var i = 0; i < this.points.length; i++)
        {
            let point = this.points[i];
            ctx.fillStyle   = Math.random() > 0.5? this.color:'white';//creates a disco effect
            ctx.fillRect(point.x,point.y,this.interval,this.interval);
        }
        */
        this.gridWorms.forEach(function(gridworm)
        {
            gridworm.draw(ctx);
        });
    }
}

export default GridWormCanvas;
