import React from 'react';
const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
]
const Stats = () => {
    return (
       <div className="w-full  mt-8 lg:mt-52">
         <div className="container px-6 py-8 mx-auto">
            <h1 className="text-2xl md:text-4xl text-white text-center mb-12 font-mono">Trusted By Our Students </h1>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 md:mt-20">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-white font-serif">{stat.name}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl font-serif">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
        </div>
       </div>
    );
};

export default Stats;